from django.db import models

class Type(models.TextChoices):
	TRUCK = "TRUCK", "TRUCK"
	CAR = "CAR", "CAR"
	BUS = "BUS", "BUS"
	VAN = "VAN", "VAN"

# Create your models here.


class Fleet(models.Model):
	vehicle_plate = models.CharField(max_length=15, blank=False, unique=True)
	brand = models.CharField(max_length=20, blank=False)
	model = models.CharField(max_length=20, blank=False)
	year = models.IntegerField(blank=True)
	vehicle_type = models.Charfield(max_length=5, choices=Type.choices, default=Type.CAR)
	created_at = models.DateField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)