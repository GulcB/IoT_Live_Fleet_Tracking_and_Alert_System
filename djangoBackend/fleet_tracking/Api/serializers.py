from rest_framework import serializers
from ..models import Fleet, Geofence
from django.contrib.gis.geos import Polygon

class FeelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fleet
		fields = '__all__'

class GeofenceSerializer(serializers.ModelSerializer):
    polygon = serializers.JSONField()

    class Meta:
        model = Geofence
        fields = [
            "id",
            "name",
            "description",
            "type",
            "polygon",
            "vehicle",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_polygon(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("polygon GeoJSON objesi olmalı.")

        if value.get("type") != "Polygon":
            raise serializers.ValidationError("polygon.type 'Polygon' olmalı.")

        coords = value.get("coordinates")
        if not coords or not isinstance(coords, list):
            raise serializers.ValidationError("polygon.coordinates hatalı.")

        ring = coords[0]
        if len(ring) < 4:
            raise serializers.ValidationError("Polygon en az 4 nokta içermeli.")

        if ring[0] != ring[-1]:
            raise serializers.ValidationError("Polygon kapalı olmalı (ilk = son nokta).")

        for pt in ring:
            if not (isinstance(pt, (list, tuple)) and len(pt) == 2):
                raise serializers.ValidationError("Her nokta [lng, lat] formatında olmalı.")

        return value

    def to_internal_value(self, data):
        """
        Input: GeoJSON polygon -> GEOS Polygon
        Bu sayede Generic Create/Update view'lar otomatik çalışır.
        """
        internal = super().to_internal_value(data)

        polygon_geojson = data.get("polygon", None)
        if polygon_geojson is not None:
            ring = polygon_geojson["coordinates"][0]
            internal["polygon"] = Polygon(ring, srid=4326)

        return internal

    def to_representation(self, instance):
        """
        Output: GEOS Polygon -> GeoJSON polygon
        """
        rep = super().to_representation(instance)

        if instance.polygon:
            ring = list(instance.polygon.coords[0])
            rep["polygon"] = {"type": "Polygon", "coordinates": [ring]}
        else:
            rep["polygon"] = None

        return rep

