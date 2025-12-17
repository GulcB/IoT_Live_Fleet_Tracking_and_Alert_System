from rest_framework import generics
from ..models import Fleet
from .serializers import FeelSerializers

class FeelAdd(generics.CreateAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers
	

class FeelList(generics.ListAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers
	
class FeelDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Fleet.objects.all()
	serializer_class = FeelSerializers