# backend/post/serializers.py
from rest_framework import serializers
from .models import graph


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'date',
            'name',
            'rank',
            'salesAmt',
            'audiCnt',
        )
        model = graph
