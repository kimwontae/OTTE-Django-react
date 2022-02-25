import pymysql
from urllib.error import HTTPError
import requests
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

def crawling(start_id, finish_id):

    for i in range(start_id, finish_id):
        url = "https://api.themoviedb.org/3/tv/" + str(i) + \
            "?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()
            data = []
            data.append([items['episode_run_time'], items['first_air_date'], 
                        items['last_air_date'], items['id'], items['in_production'], 
                        items['languages'][0], items['name'], items['overview'],
                        items['popularity'], items['poster_path'], items['status']]) 
            print(data) 
            sql = 'insert themovie_tv(episode_run_time, first_air_date, last_air_date, themovieid, in_production, original_language, original_title, overview, popularity, poster_path, status)'
            cur.executemany(sql, data)

        except KeyError:
            pass
        except HTTPError as e:
            print(e)
            pass
        finally:
            print(i)
            print('완료')