# backend/post/views.py
from django.shortcuts import render
from rest_framework import generics

from .models import graph
from .serializers import PostSerializer


class ListPost(generics.ListCreateAPIView):
    queryset = graph.objects.all()
    serializer_class = PostSerializer


class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = graph.objects.all()
    serializer_class = PostSerializer
