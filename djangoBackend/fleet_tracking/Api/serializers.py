from rest_framework import serializers
from ..models import Fleet, Geofence, GeofenceViolation

class FeelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fleet
		fields = '__all__'

class GeofenceSerializer(serializers.ModelSerializer):
    geometry = serializers.JSONField()

    class Meta:
        model = Geofence
        fields = [
            "id",
            "name",
            "description",
            "geometry",
            "type",
            "vehicle",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_geometry(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("geometry GeoJSON objesi olmalı.")

        geo_type = value.get("type")

        if geo_type == "Polygon":
            coords = value.get("coordinates")
            if not coords or not isinstance(coords, list):
                raise serializers.ValidationError("Polygon coordinates hatalı.")

            ring = coords[0]
            if len(ring) < 4:
                raise serializers.ValidationError("Polygon en az 4 nokta içermeli.")

            if ring[0] != ring[-1]:
                raise serializers.ValidationError("Polygon kapalı olmalı.")

        elif geo_type == "Circle":
            if "center" not in value or "radius_m" not in value:
                raise serializers.ValidationError("Circle için center ve radius_m zorunlu.")

        else:
            raise serializers.ValidationError("geometry.type Polygon veya Circle olmalı.")

        return value

class GeofenceViolationSerializers(serializers.ModelSerializer):
    class Meta:
        model = GeofenceViolation
        fields = '__all__'