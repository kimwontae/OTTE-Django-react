from rest_framework import serializers
from .models import Board
from .models import comment
from .models import UploadFileModel


class commentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'board_id',
            'id',
            'title',
            'comment_user',
            'comment_content',
        )
        model = comment


class imageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'description',
            'images'
        )
        model = UploadFileModel


class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'title',
            'username',
            'content',
            'readcount',
            'writedate',
        )
        model = Board


class BoardandCommentSerializer(serializers.ModelSerializer):

    board = commentSerializer(many=True, read_only=True)

    class Meta:
        fields = (
            'id',
            'title',
            'username',
            'content',
            'readcount',
            'writedate',
            'board'
        )
        model = Board
