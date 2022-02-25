# backend/post/views.py
from django.shortcuts import render
from rest_framework import generics

from .models import Box
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination


class ListPost(generics.ListCreateAPIView):
    queryset = Box.objects.all()
    serializer_class = PostSerializer


class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Box.objects.all()
    serializer_class = PostSerializer
