import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

def crawling(start_id, finish_id):

    for i in range(start_id, finish_id):
        url = "https://api.themoviedb.org/3/movie/" + str(i) + \
            "?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            # 성인물이 아닌 컨텐츠만 저장
            if items['adult'] == False:
                print(items['title'])
                data = []

                data.append([items['adult'], items['id'], items['imdb_id'], items['original_language'], items['original_title'],
                            items['overview'], items['popularity'], items['poster_path'], items['release_date'], items['runtime'], items['status'], items['title']])
                sql = "insert into themoviedb_movie(adult, themovieid, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, runtime, status, title) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
                cur.executemany(sql, data)
                
            else:
                pass            
            conn.commit()
        except KeyError:
            print(i,"없음")
            pass    
            # 순차적 진행중 특정아이디가 tmdb에 없는 작품들 pass
        except HTTPError as e:
            print(e)
            pass
        finally:
            print(i,'완료')