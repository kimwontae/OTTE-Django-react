import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime
# -*- encoding: cp949 -*-

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()


def personcrawling(start_id, finish_id):

    for i in range(start_id, finish_id):
        url = 'https://api.themoviedb.org/3/person/' + \
            str(i) + '?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR'
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            print(items['name'])
            data = []
            data.append([items['id'], items['name']])
            sql = "insert into themoviedb_person(themovieid, name) VALUES(%s,%s);"
            cur.executemany(sql, data)

            conn.commit()
        except KeyError:
            pass
        except HTTPError as e:
            print(e)
            pass
        finally:
            print(i)
            print('완료')


""" 
cur.close()
conn.close() """
