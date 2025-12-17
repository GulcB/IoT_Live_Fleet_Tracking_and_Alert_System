from rest_framework import generics
from ..models import Fleet, Geofence
from .serializers import FeelSerializers, GeofenceSerializer
from django.shortcuts import get_object_or_404

class FeelAdd(generics.CreateAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers
	

class FeelList(generics.ListAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers
	
class FeelDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers
	
class GeofenceListCreateView(generics.ListCreateAPIView):
    queryset = Geofence.objects.all()
    serializer_class = GeofenceSerializer

class GeofenceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Geofence.objects.all()
    serializer_class = GeofenceSerializer