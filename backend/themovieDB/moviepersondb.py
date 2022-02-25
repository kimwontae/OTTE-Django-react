import pymysql
import json
import requests
from urllib.error import HTTPError
from datetime import datetime

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 영화 출연진, 감독 크롤링
def moviepersoncrawling(id,otteid):

    url = 'https://api.themoviedb.org/3/movie/' + \
        str(id) + '/credits?api_key=5605da5e202977c4ef4b7125796e1173&language=ko-KR'
    try:
        # [데이터 요청]
        r = requests.get(url)
            
        # [JSON 형태로 응답받은 데이터를 딕셔너리 데이터로 변환]
        items = r.json()
        

        if items['cast'] is not None:
            for j in range(len(items['cast'])):
                data = []
                if items['cast'][j]['order'] == 0 or items['cast'][j]['order'] == 1:
                    data.append([otteid, items['cast'][j]['name']])
                    print("@@@@@@@배우",data)
                    sql = "insert into themoviedb_movieactors(otteid, personname) VALUES(%s,%s);"
                    cur.executemany(sql, data)

        if items['crew'] is not None:
            for j in range(len(items['crew'])):
                data = []
                if items['crew'][j]['job'] == 'Director':
                    data.append([otteid, items['crew'][j]['name']])
                    print("@@@@@@@감독",data)  
                    sql = "insert into themoviedb_moviedirectors(otteid, personname) VALUES(%s,%s);"
                    cur.executemany(sql, data)
            
        else:
            print(id+"없음")
            pass
        conn.commit()

    except KeyError:
        pass
    except IndexError:
        pass
    except HTTPError as e:
            
        pass
    finally:
        print(id)
        print('완료')


"""  
cur.close()
conn.close() """
