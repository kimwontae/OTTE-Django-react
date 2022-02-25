from typing_extensions import runtime
import requests
from bs4 import BeautifulSoup
import pymysql
import requests
from urllib.error import HTTPError
import re

# db커넥션
conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# imdb 평점 크롤러
def get_imdb_score(start_id, finish_id):
    data = []
    for i in range(start_id, finish_id):

        try:
            sel_sql = "select imdb_id from themoviedb_movie where otteid = %s;"
            cur.execute(sel_sql, i)
            imdb_id = cur.fetchall()

            if imdb_id is not None:
                url = 'https://www.imdb.com/title/' + \
                    str(imdb_id[0][0])+'/ratings/?ref_=tt_ov_rt'
                r = requests.get(url)
                soup = BeautifulSoup(r.text, "html.parser")
                rimdbscore = soup.select_one(
                    "#main > section > div > div.subpage_title_block > div > div.ipl-rating-widget > div.ipl-rating-star > span.ipl-rating-star__rating")
                data = []

                if rimdbscore is not None:
                    imdbscore = float(rimdbscore.text)
                    data.append([imdbscore, i])
                    print(data)

                    updatesql = "UPDATE themoviedb_movie SET imdbscore = %s WHERE otteid = %s;"
                    cur.executemany(updatesql, data)

                    conn.commit()
        except:
            pass
        finally:
            print('@@완료@@')
