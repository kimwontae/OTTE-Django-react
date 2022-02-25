from django.db.models import query
from django.views import generic
from rest_framework import generics
from themovieDB.models import movie, moviegenres, movieactors, moviedirectors, movieott, Review
from django.db.models import F
from .serializers import PostSerializer, SortSerializer, AllGenreSerializer, ActorSerializer, DirectorSerializer, OttSerializer, MovieSerializer, reviewSerializer
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from datetime import datetime


class ListPost(generics.ListCreateAPIView):
    queryset = movie.objects.all()
    serializer_class = PostSerializer

# 디테일뷰
class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = movie.objects.all()
    serializer_class = PostSerializer

# 최신영화 50개 sorting
class RecentPost(generics.ListCreateAPIView):
    queryset = movie.objects.filter(status = 'Released').order_by('-release_date')[:50]
    serializer_class = SortSerializer

# 한국 작품들 중 19년도 이후에 나온 작품들 sorting
class KoreaPost(generics.ListCreateAPIView):
    queryset = movie.objects.filter(original_language = 'ko', release_date__range=["2019-01-01", datetime.today()]).order_by('?')[:100]
    '''SELECT `themovieDB_movie`.`otteid`, `themovieDB_movie`.`adult`, `themovieDB_movie`.`collection_id`, `themovieDB_movie`.`collection_name`, `themovieDB_movie`.`themovieid`, `themovieDB_movie`.`imdb_id`, `themovieDB_movie`.`original_language`, `themovieDB_movie`.`original_title`, `themovieDB_movie`.`overview`, `themovieDB_movie`.`popularity`, `themovieDB_movie`.`poster_path`, `themovieDB_movie`.`release_date`, `themovieDB_movie`.`runtime`, `themovieDB_movie`.`status`, `themovieDB_movie`.`title`, `themovieDB_movie`.`naverid`, `themovieDB_movie`.`naverscore`, `themovieDB_movie`.`imdbscore`, `themovieDB_movie`.`ottescore` FROM `themovieDB_movie` 
    WHERE (`themovieDB_movie`.`original_language` = ko AND `themovieDB_movie`.`release_date` BETWEEN 2019-01-01 AND 2022-01-17) ORDER BY RAND() ASC LIMIT 100'''
    serializer_class = SortSerializer

# imdb 평점이 8점 이상인작품들 sorting
class FamousPost(generics.ListCreateAPIView):
    queryset = movie.objects.filter(imdbscore__gt = 8).order_by('?')[:50]
    serializer_class = SortSerializer

# 컨텐츠 인기순
class PopularPost(generics.ListCreateAPIView):
    queryset = movie.objects.order_by('-popularity')
    serializer_class = SortSerializer

# 영화 장르
class GenredetailPost(APIView):   
    def get(self, request, pk):
        try:
            queryset = moviegenres.objects.filter(otteid=pk).select_related('genreid').values('genreid__name','genreid__id').annotate(name =F('genreid__name'),id=F('genreid__id'))
            """ SELECT `themovieDB_genresinmovie`.`name`, `themovieDB_moviegenres`.`genreid`, 
            `themovieDB_genresinmovie`.`name` AS `name`, `themovieDB_moviegenres`.`genreid` 
            AS `id` FROM `themovieDB_moviegenres` LEFT OUTER JOIN `themovieDB_genresinmovie` 
            ON (`themovieDB_moviegenres`.`genreid` = `themovieDB_genresinmovie`.`id`) 
            WHERE `themovieDB_moviegenres`.`otteid` = {id값}"""
            print("@@@@@@@",queryset.query)
            serializer = AllGenreSerializer(queryset, many=True)
            return Response(serializer.data)
        except moviegenres.DoesNotExist:
            raise Http404

# 영화 출연배우
class ActordetailPost(APIView):   
    def get(self, request, pk):
        try:
            queryset = movieactors.objects.filter(otteid=pk).values('personname')
            print("@@@@@@@",queryset.query)
            serializer = DirectorSerializer(queryset, many=True)
            return Response(serializer.data)
        except moviegenres.DoesNotExist:
            raise Http404

# 영화 감독
class DirectordetailPost(APIView):   
    def get(self, request, pk):
        try:
            queryset = moviedirectors.objects.filter(otteid=pk).values('personname')
            print("@@@@@@@",queryset.query)
            serializer = ActorSerializer(queryset, many=True)
            return Response(serializer.data)
        except moviegenres.DoesNotExist:
            raise Http404

# 영화 ott서비스
class OttdetailPost(APIView):   
    def get(self, request, pk):
        try:
            queryset = movieott.objects.filter(otteid=pk).values('ottname').order_by('priority')
            serializer = OttSerializer(queryset, many=True)
            return Response(serializer.data)
        except moviegenres.DoesNotExist:
            raise Http404

# 영화정보
class movieList(generics.RetrieveUpdateDestroyAPIView):
    queryset = movie.objects.all()
    serializer_class = MovieSerializer


class deleteReview(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = reviewSerializer

class DetailReview(APIView):
    def get_object(self, pk):
        try:
            return Review.objects.filter(otteid=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Review = self.get_object(pk)
        serializer = reviewSerializer(Review, many=True)
        return Response(serializer.data)


class ListReview(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = reviewSerializer


#댓글 목록 및 새 댓글 작성
# class ListReview(generics.ListCreateAPIView):
#     def get(self, request, pk):
#         serializer_class = reviewSerializer(Review.objects.all(), many=True)
#         return Response(serializer.data)
#     def post(self, request):
#         serializer_class = reviewSerializer
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

#     # queryset = Review.objects.all()
#     # serializer_class = reviewSerializer


# #댓글 내용, 수정, 삭제
# class DetailReview(generics.ListCreateAPIView):
#     # queryset = Review.objects.filter(post=otteid)
#     # serializer_class = reviewSerializer
#     def get_object(self, pk):
#         return get_object_or_404(Review, otteid=pk)
#     def get(self, request, pk, format=None):
#         post = self.get_object(pk)
#         serializer = reviewSerializer(post)
#         return Response(serializer.data)
#     def put(self, request, pk):
#         post = self.get_object(pk)
#         serializer = reviewSerializer(post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)
#     def delete(self, request, pk):
#         post = self.get_object(pk)
#         post.delete()
#         return Response()


# class DetailReview(APIView):
#     def get_object(self, pk):
#         try:
#             return Review.objects.filter(otteid=pk)
#         except Review.DoesNotExist:
#             raise Http404

#     def post(self, request, pk, format=None):
#         Review = self.get_object(pk)
#         serializer = reviewSerializer(Review, many=True)
#         return Response(serializer.data)



##댓글기능 구현 중
# class ListReview(generics.ListCreateAPIView):
#     queryset = Review.objects.order_by('writedate')
#     serializer_class = reviewSerializer


# class DetailLastReview(generics.ListCreateAPIView):
#     queryset = Review.objects.order_by('-id')[:1]
#     serializer_class = reviewSerializer