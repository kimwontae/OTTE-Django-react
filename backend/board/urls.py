from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.ListBoard.as_view()),
    path('<int:pk>/', views.DetailBoard.as_view()),
    path('Top/', views.ListBoardTop5.as_view()),
    path('comment/', views.ListComment.as_view()),
    path('comment/<int:pk>/', views.DetailComment.as_view()),
    path('last/', views.DetailLastBoard.as_view()),
    path('comment/delete/<int:pk>/', views.deleteComment.as_view()),
    path('test/', views.model_form_upload),
    path('image/<str:pk>/', views.ListImage.as_view()),
]
