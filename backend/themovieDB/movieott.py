import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 특정 id 크롤링
def ottcrawling(id):

        url = "https://api.themoviedb.org/3/movie/" + str(id) + \
            "/watch/providers?api_key=5605da5e202977c4ef4b7125796e1173"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            if items['results']['KR']['flatrate']:
                sel_sql = 'select otteid from themoviedb_movie where themovieid = %s;'
                cur.execute(sel_sql,id)
                otteid = cur.fetchone()
                otteid = int(otteid[0])

                for n in range(len(items['results']['KR']['flatrate'])):
                    ottdata = []
                    ottname = items['results']['KR']['flatrate'][n]['provider_name']
                    priority = items['results']['KR']['flatrate'][n]['display_priority']
                    ottdata.append([otteid, ottname, priority])
                    print('@@@@@@@@')
                    print(ottdata)
                    sql = 'INSERT INTO themoviedb_movieott(otteid,ottname,priority) values(%s,%s,%s)'
                    cur.executemany(sql,ottdata)
                    conn.commit()

        except KeyError:
            pass
        except TypeError:
            pass
        except HTTPError as e:
            print(e)
            pass
        finally:
            print(id)
            print('완료')