from rest_framework import generics
from ..models import Fleet
from .serializers import FeelSerializers
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

	def get_object(self):
		pk = self.kwargs['pk']
		return get_object_or_404(Fleet, pk=pk)