import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 한국영화만 크롤링
def crawling(start_id, finish_id):

    for i in range(start_id, finish_id):
        url = "https://api.themoviedb.org/3/movie/" + str(i) + \
            "?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            if items['adult'] == False and items['original_language'] == 'ko':
                print(items['title'])
                data = []
                if items['release_date'] == "":
                    items['release_date'] = None
                    print(items['release_date'])
                data.append([items['adult'], items['id'], items['imdb_id'], items['original_language'], items['original_title'],
                            items['overview'], items['popularity'], items['poster_path'], items['release_date'], items['runtime'], items['status'], items['title']])
                sql = "insert into themoviedb_movie(adult, themovieid, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, runtime, status, title) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
                cur.executemany(sql, data)
                
                
            else:
                pass            
            conn.commit()
        except KeyError:
            pass
        except HTTPError as e:
            print(e)
            pass
        finally:
            print(i)
            print('완료')