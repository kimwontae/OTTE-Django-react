from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListPost.as_view()),
    path('<int:pk>/', views.DetailPost.as_view()),
    # 최신 영화이름, 오떼아이디 100개만 출력
    path('recent', views.RecentPost.as_view()),
    # 한국 영화이름, 오떼아이디 100개만 출력
    path('korea', views.KoreaPost.as_view()),
    # imdb 평점 높은 작품들 50개만 출력
    path('famous', views.FamousPost.as_view()),
    # 인기도 높은 작품들 50개만 출력
    path('popular', views.PopularPost.as_view()),
    # 영화 장르
    path('genre/<int:pk>/', views.GenredetailPost.as_view()),
    # 영화 배우
    path('actor/<int:pk>/', views.ActordetailPost.as_view()),
    # 영화 감독
    path('director/<int:pk>/', views.DirectordetailPost.as_view()),
    # 영화 ott
    path('ott/<int:pk>/', views.OttdetailPost.as_view()),

    path('test/<int:pk>/', views.movieList.as_view()),

    ##댓글기능 구현중
    #댓글 보기, 등록
    path('review/<int:pk>', views.DetailReview.as_view()),
    path('review', views.ListReview.as_view()),
    #댓글 수정 삭제
    # path('review/delete/<int:pk>/', views.DetailReview.as_view()),
    # path('delete/<int:pk>/', views.deleteReview.as_view()),
]