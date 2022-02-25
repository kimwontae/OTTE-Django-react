from movieott import ottcrawling
import pymysql

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

# 테이블에 존재하는 영화만 크롤링
sql = "select themovieid from themoviedb_movie;"
cur.execute(sql)
result = cur.fetchall()

for i in result:
    ottcrawling(i[0])