# backend/djangoreactapi/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import validate_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),

    path('apimovie/', include('themovieDB.urls')),
    path('board/', include('board.urls')),
    path('insertcnt/', include('insertcnt.urls')),
    path('api/', include('post.urls')),
    path('chartapi/', include('Charts.urls')),
    path('boxapi/', include('Box.urls')),
    path('graphapi/', include('graph.urls')),
    path('weeklytop3/', include('weeklytop3.urls')),
    path('validate/', validate_jwt_token),
    path('login/', obtain_jwt_token),
    
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    
    path('user/', include('user.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
