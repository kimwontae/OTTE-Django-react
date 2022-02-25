#backend/post/views.py
from django.shortcuts import render
from requests.api import request
from rest_framework import generics
from django.http import Http404
from rest_framework.response import Response
from .models import totalrank
from .models import insertcnt
from .models import insertcntrank
from .serializers import insertcntSerializer, totalrankSerializer
from rest_framework.views import APIView
from datetime import datetime, timedelta, time, date
from django.db import models
from django.db.models import Count
from django.db import connection
import pymysql
from urllib.error import HTTPError
import json
import requests
from datetime import datetime
from themovieDB.models import movie
##################################################################


##################################################################
conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()
##################################################################



#ListCreateAPIView를 사용한 검색기록 저장
class Listinsertcnt(generics.ListCreateAPIView):
    
    #if pram.select =='t': 
    #    filter_str="text='fdsfds'"
    #elif(pram.select=='c'):
    #    filter_str="text='fddddd'"
    #else:
    #    filter_str="text='fddddddffff'"
    #queryset = insertcnt.objects.filter(filter_str)
    queryset = insertcnt.objects.all()
    serializer_class = insertcntSerializer


#특정 검색기록 검색
class Detailinsertcnt(generics.RetrieveUpdateDestroyAPIView):
    queryset = insertcnt.objects.all()
    serializer_class = insertcntSerializer


#실시간 검색어 update
class Sortinsertcnt_top(generics.ListCreateAPIView):
    queryset = insertcntrank.objects.all()
    serializer_class = insertcntSerializer

    def __init__(self):
        self.insertrank()

    def insertrank(self):
        print('start')
        for i in range(0, 5):
            try:
                a=date.today()
                print(a)
                data = []
                data.append([i,i+1])
                sql = "update otte_dev.insertcnt_insertcntrank set text =(select text from (SELECT text FROM otte_dev.insertcnt_insertcnt where sysdate = CURDATE() or(sysdate >= CURDATE()-1 and systime > sysdate()) GROUP BY text HAVING COUNT(text) > 0 ORDER BY COUNT(text) DESC)as a limit %s,1)where id =%s;"
                cur.executemany(sql, data)         
                conn.commit()
            except KeyError:
                pass
            except HTTPError as e:
                pass
            finally:
                print(i)
                print('완료')



#항목별(영상) 순위추적 
class Inserttotalrank(APIView):
    def post(self, request):
        a=request.data.get('id')
        print("post execute...")
        print("post=", a)
        rank = self.get_object(a)
        print("qqqq", rank)
        serializer_class = totalrankSerializer(rank, many=True)
        return Response(serializer_class.data)
    def get_object(self, a):
        today=datetime.today()
        lastweek = date.today() - timedelta(days=6)
        

        todaydates=today.strftime('%m-%d')
        lastweekdates=lastweek.strftime('%m-%d')
        print("today+", today)
        print("lastweek1+", lastweekdates)
        print("today1+", todaydates)
        print("get start")
        print("get + ", a)
        #queryset = totalrank.objects.filter(text=a)
        queryset = totalrank.objects.filter(text=a, sysdate__range=[lastweekdates, todaydates]).order_by('sysdate')
        #queryset = movie.objects.filter(       release_date__range=["2019-01-01"                    , datetime.today()]).order_by('?')[:100]
        print(queryset)
        try:
            return queryset
        except totalrank.DoesNotExist:
            raise Http404


    def inserttotalrank(self):
        print('start222222')
        try:
            a=date.today() - timedelta(days=1)
            print(a)
            data = []
            data.append([a])     
            #어제날짜 까지만
            sql = "insert into otte_dev.insertcnt_totalrank (text, rank, sysdate)select a.text, @rownum := @rownum+1 as rank, substring_index(a.sysdate, '-', -2) from (SELECT id, text, count(text)as cnt, sysdate from otte_dev.insertcnt_insertcnt as insertcnt, otte_dev.themoviedb_movie as movie  where sysdate = %s and insertcnt.text=movie.title and not exists(select sysdate from otte_dev.insertcnt_totalrank where sysdate=%s) group by text having count(text)>0 order by cnt desc limit 0,20) as a, (select @rownum:=0) as b;"
            #insertcnt_totalrank 테이블에 어제날짜의 데이터가 없을경우 
            #어제날짜의 검색기록을 카운트해서 1-100순위로 나눈후 insert한다.

            cur.executemany(sql, data)        
            conn.commit()
        except KeyError:
            pass
        except HTTPError as e:
            pass
        finally:
            print('완료')


#오늘자 검색기록 검색(ORM, 미사용)
""" 
class Sortinsertcnt_today(APIView):
    #today = datetime.today().date()
    #yesterday = date.today() - timedelta(days=1)
    #lastweek = 
    def get_object(self, sysdate):
        try:
            return insertcnt.objects.filter(sysdate=date.today())
        except insertcnt.DoesNotExist:
            raise Http404
    def get(self, format=None):
        insertcnt = self.get_object('')
        #print(insertcnt.type)
        serializer_class = insertcntSerializer(insertcnt, many=True)
        return Response(serializer_class.data)

 """

#어제자 검색기록 검색(ORM, 미사용)
""" 
class Sortinsertcnt_yesterday(APIView):
    #today = datetime.today().date()
    #yesterday = date.today() - timedelta(days=1)
    #lastweek = 
    def get_object(self, sysdate):
        try:
            return insertcnt.objects.filter(sysdate=date.today() - timedelta(days=1))
        except insertcnt.DoesNotExist:
            raise Http404
    def get(self, format=None):
        insertcnt = self.get_object('')
        serializer_class = insertcntSerializer(insertcnt, many=True)
        return Response(serializer_class.data)
 """

#search(미사용)
""" 
class Search(APIView):
    def post(self, request, id):
        print("post execute...")
        print("post", id)
        search = self.get_object(id)
        print(search)
        serializer_class = searchSerializer(search, many=True)
        return Response(serializer_class.data)
    def get_object(self, id):
        queryset = movie.objects.filter(title=id)
        print(queryset)
        print("get start")
        print("get + ",id)
        try:
            return movie.objects.filter(title=id)
        except movie.DoesNotExist:
            raise Http404
    def get(self, request, id, format=None):
        search = self.get_object(id)
        #print(insertcnt.type)
        serializer_class = searchSerializer(search, many=True)
        return Response(serializer_class.data)
 """


