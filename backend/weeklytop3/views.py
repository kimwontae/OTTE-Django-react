# backend/post/views.py
from django.shortcuts import render
from rest_framework import generics

from .models import weeklytop3
from .serializers import PostSerializer


class ListPost(generics.ListCreateAPIView):
    queryset = weeklytop3.objects.all()
    serializer_class = PostSerializer


class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = weeklytop3.objects.all()
    serializer_class = PostSerializer
