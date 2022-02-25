from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Board, comment, UploadFileModel
from .serializers import BoardSerializer, commentSerializer, imageSerializer
import logging
from django.http import Http404


import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from . forms import DocumentForm

logger = logging.getLogger(__name__)


class ListBoard(generics.ListCreateAPIView):
    queryset = Board.objects.order_by('-id')
    serializer_class = BoardSerializer


class ListBoardTop5(generics.ListCreateAPIView):
    queryset = Board.objects.order_by('-readcount')[:5]
    serializer_class = BoardSerializer


class DetailBoard(generics.RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class DetailLastBoard(generics.ListCreateAPIView):
    queryset = Board.objects.order_by('-id')[:1]
    serializer_class = BoardSerializer


class ListComment(generics.ListCreateAPIView):
    queryset = comment.objects.all()
    serializer_class = commentSerializer


""" class DetailComment(APIView):
    def get(request, pk):
        return comment.objects.filter(board_id=pk)
 """


class ListImage(APIView):

    def get_object(self, pk):
        try:
            return UploadFileModel.objects.filter(description=pk)
        except UploadFileModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        images = self.get_object(pk)
        serializer = imageSerializer(images, many=True)
        return Response(serializer.data)


class deleteComment(generics.RetrieveUpdateDestroyAPIView):
    queryset = comment.objects.all()
    serializer_class = commentSerializer


class DetailComment(APIView):
    def get_object(self, pk):
        try:
            return comment.objects.filter(board_id=pk)
        except comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = commentSerializer(comment, many=True)
        return Response(serializer.data)


@method_decorator(csrf_exempt, name="dispatch")
def model_form_upload(request):
    if request.method == "POST":
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"Status": "Success"}))
        else:
            return HttpResponse(json.dumps({"Status": "Success"}))
