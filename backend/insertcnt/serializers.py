#backend/post/serializers.py
from rest_framework import serializers
from .models import insertcnt, insertcntrank, totalrank
from themovieDB.models import movie
##################################################################


#검색기록
class insertcntSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'text',
            'sysdate',
            'systime',
        )
        model = insertcnt

#실시간 검색어
class insertcntrankSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'rank',
            'text',
        )
        model = insertcntrank

#항목별(영상) 순위추적 
class totalrankSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'text',
            'rank',
            'sysdate',
        )
        model = totalrank


#검색 (미사용)
""" class searchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'otteid',
            'title',
        )
        model = movie
 """