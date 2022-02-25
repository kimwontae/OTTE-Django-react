#backend/post/urls.py
from django.urls import path
from . import views
##################################################################


urlpatterns = [
    path('', views.Listinsertcnt.as_view()),
    path('<int:pk>/', views.Detailinsertcnt.as_view()),
    path('top/', views.Sortinsertcnt_top.as_view()),
    path('rank/', views.Inserttotalrank.as_view()),
    #path('rank/<str:id>', views.Inserttotalrank.as_view()),
    #path('today/', views.Sortinsertcnt_today.as_view()),
    #path('yesterday/', views.Sortinsertcnt_yesterday.as_view()),
    #path('search/<str:id>', views.Search.as_view()),
]