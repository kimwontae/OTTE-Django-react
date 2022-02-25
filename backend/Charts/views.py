#backend/post/views.py
from django.shortcuts import render
from rest_framework import generics

from .models import charts
from .serializers import PostSerializer

class ListPost(generics.ListCreateAPIView):
    queryset = charts.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = charts.objects.all()
    serializer_class = PostSerializer
