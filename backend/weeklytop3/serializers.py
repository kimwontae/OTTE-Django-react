# backend/post/serializers.py
from rest_framework import serializers
from .models import weeklytop3


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'date',
            'top_name',
            'top_salesAmt',
            'top_audiCnt',
            'second_name',
            'second_salesAmt',
            'second_audiCnt',
            'third_name',
            'third_salesAmt',
            'third_audiCnt',
        )
        model = weeklytop3
