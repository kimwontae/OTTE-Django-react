from typing_extensions import runtime
import requests
from bs4 import BeautifulSoup
import pymysql
import requests
from urllib.error import HTTPError
import re

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 네이버 평점 크롤링
def get_movie_point(start_id, finish_id):
    data = []
    for i in range(start_id, finish_id):
        url = 'https://movie.naver.com/movie/bi/mi/basic.naver?code='+str(i)

        try:
            r = requests.get(url)
            soup = BeautifulSoup(r.text, "html.parser")

            naverid = i
            navertitle = soup.select_one("h3.h_movie a")
            naverruntime = soup.select_one("dl.info_spec dd p span:nth-of-type(3)")
            rnaverscore = soup.select_one("div.main_score div.score a div.star_score span.st_off span.st_on")
            # (4) skip 처리-1: 평점이 없으면 넘어간다.
            non_score = "관람객 평점 없음"
            if (rnaverscore == None) or (non_score in rnaverscore.text):
                continue
            # (4-1) score에서 점수 부분만 남기고 숫자로 변환한다.
            naverscore = rnaverscore.text
            naverscore = float(naverscore[6:11])
            
            
            
            nruntime=naverruntime.text[:-2] # 런타임 숫자형으로 정제

            sel_sql = "select otteid from themoviedb_movie where title = %s;"
            cur.execute(sel_sql,navertitle.text)
            otteids = cur.fetchall()
            print(otteids)
            otteid = 0

            for n in otteids:
                sel_sql = "select runtime, otteid from themoviedb_movie where otteid = %s;"
                cur.execute(sel_sql,n)
                result = cur.fetchall()
                
                if int(nruntime) == result[0][0]:
                    otteid = n
            
            print(otteid)
            data.append([int(naverid), naverscore, int(otteid[0])])
            print(data)
            updatesql = "UPDATE themoviedb_movie SET naverid = %s, naverscore = %s WHERE otteid = %s;"
            cur.executemany(updatesql, data)

            conn.commit()
        except:
            pass
        finally:
            print(i)
            print('번 성공!')