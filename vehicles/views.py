from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Vehicle
from .serializers import VehicleSerializer

# List and Create Vehicles
class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

# Retrieve, Update, and Delete Vehicles
class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
