import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 범위 크롤링
def genrescrawling(start_id, finish_id):

    for i in range(start_id, finish_id):
        url = "https://api.themoviedb.org/3/movie/" + str(i) + \
            "?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            if items['genres']:
                print(items['title'])
                sel_sql = 'select otteid from themoviedb_movie where themovieid = %s;'
                cur.execute(sel_sql,i)
                otteid = cur.fetchone()
                otteid = int(otteid[0])
                print(otteid)

                for n in range(len(items['genres'])):   
                    genredata = []
                    genreid = items['genres'][n]['id']
                    genredata.append([otteid, genreid])
                    print('@@@@@@@@')
                    print(genredata)
                    sql = 'INSERT INTO themoviedb_moviegenres(otteid,genreid) values(%s,%s)'
                    cur.executemany(sql,genredata)
                    conn.commit()
                    
            else:
                pass            
            
        except KeyError:
            pass
        except TypeError:
            pass
        except HTTPError as e:
            print(e)
            pass
        
        finally:
            print(i)
            print('완료')

# 특정 id 크롤링
def genrescrawling(id):

        url = "https://api.themoviedb.org/3/movie/" + str(id) + \
            "?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR"
        try:
            # [데이터 요청]
            r = requests.get(url)

            # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
            items = r.json()

            if items['genres']:
                print(items['title'])
                sel_sql = 'select otteid from themoviedb_movie where themovieid = %s;'
                cur.execute(sel_sql,id)
                otteid = cur.fetchone()
                otteid = int(otteid[0])
                print(otteid)

                for n in range(len(items['genres'])):   
                    genredata = []
                    genreid = items['genres'][n]['id']
                    genredata.append([otteid, genreid])
                    print('@@@@@@@@')
                    print(genredata)
                    sql = 'INSERT INTO themoviedb_moviegenres(otteid,genreid) values(%s,%s)'
                    cur.executemany(sql,genredata)
                    conn.commit()
                    
            else:
                pass            
            
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