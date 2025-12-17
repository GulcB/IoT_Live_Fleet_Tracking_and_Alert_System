from django.db import models
from django.contrib.gis.db import models as gis_models

class TypeCar(models.TextChoices):
	TRUCK = "TRUCK", "TRUCK"
	CAR = "CAR", "CAR"
	BUS = "BUS", "BUS"
	VAN = "VAN", "VAN"

class GeoType(models.TextChoices):
	ALLOWED = 'ALLOWED', 'ALLOWED'
	RESTRICTED = 'RESTRICTED', 'RESTRICTED'
# Create your models here.


class Fleet(models.Model):
	vehicle_plate = models.CharField(max_length=15, blank=False, unique=True)
	brand = models.CharField(max_length=20, blank=False)
	model = models.CharField(max_length=20, blank=False)
	year = models.IntegerField(blank=True)
	vehicle_type = models.Charfield(max_length=5, choices=TypeCar.choices, default=TypeCar.CAR)
	created_at = models.DateField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class Geofence(models.Model):
	name = models.CharField(max_length=100, blank=False)
	description = models.CharField(max_length=100, blank=True, null=True)
	polygon = gis_models.PolygonField(srid=4326, null=True, blank=True)
	type = models.Charfield(max_length=10, choices=GeoType.choices, default=GeoType.RESTRICTED)
	vehicle = models.ForeignKey(
        "fleet_tracking.Fleet",   # app label'ın farklıysa düzelt
        on_delete=models.CASCADE,
        related_name="geofences",
        null=True,
        blank=True,
    )
	is_active = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)