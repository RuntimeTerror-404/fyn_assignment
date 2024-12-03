from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Component
from .serializers import ComponentSerializer

# List and Create Components
class ComponentListCreateView(generics.ListCreateAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

# Retrieve, Update, and Delete Components
class ComponentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
