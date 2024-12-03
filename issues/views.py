from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Issue
from .serializers import IssueSerializer

# List and Create Issues
class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

# Retrieve, Update, and Delete Issues
class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
