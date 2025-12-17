from rest_framework import serializers
from ..models import Fleet

class FeelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fleet
		fields = '__all__'