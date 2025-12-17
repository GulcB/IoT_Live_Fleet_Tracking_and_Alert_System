from rest_framework import generics
from ..models import Fleet, Geofence, GeofenceViolation
from .serializers import FeelSerializer, GeofenceSerializer, GeofenceViolationSerializers
from django.shortcuts import get_object_or_404

class FeelAdd(generics.CreateAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializer
	

class FeelList(generics.ListAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializer
	
class FeelDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializer
	
class GeofenceListCreateView(generics.ListCreateAPIView):
    queryset = Geofence.objects.all()
    serializer_class = GeofenceSerializer

class GeofenceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Geofence.objects.all()
    serializer_class = GeofenceSerializer

class GeofenceViolationListCreate(generics.ListCreateAPIView):
    queryset = GeofenceViolation.objects.all()
    serializer_class = GeofenceViolationSerializers

class GeofenceViolationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GeofenceViolation.objects.all()
    serializer_class = GeofenceViolationSerializers