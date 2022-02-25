from moviepersondb import moviepersoncrawling
import pymysql

conn = pymysql.connect(host='192.168.0.41', port=3306,
                       user='team1', password='team1', db='otte_dev')
cur = conn.cursor()

sql = "select themovieid, otteid from themoviedb_movie;"
cur.execute(sql)
result = cur.fetchall()

for i in range(len(result)):
    id = result[i][0]
    otteid = result[i][1]
    moviepersoncrawling(id, otteid)