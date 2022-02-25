# -*- coding: utf-8 -*-
import json
import urllib.request as ul
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import pandas as pd
import pymysql
import requests
from matplotlib import pyplot as plt
from pandas import DataFrame
from prettytable import PrettyTable
from prettytable.prettytable import HEADER
from sqlalchemy import create_engine
from tabulate import tabulate
from datetime import date, datetime

juso_db = pymysql.connect(
    user='team1',
    passwd='team1',
    host='192.168.0.41',
    db='otte_dev',
    charset='utf8'
)


cursor = juso_db.cursor(pymysql.cursors.DictCursor)


today = datetime.today().strftime("%Y%m%d")

str(today)
yesterday = int(today)-1
print(today)
print(yesterday)

sql = "DELETE FROM `weeklytop3`;"
cursor.execute(sql)
juso_db.commit()

# 날짜 값 받아와야함
print("한주간 TOP3 영화 정보를 불러옵니다. 오늘은 "+today+" 입니다.")
week = [1,2,3,4,5,6,7]
num=[0, 1, 2]
for i in week:
    moviedate = int(today)-i
    moviedatea=str(moviedate)
    url="http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c1035a0cccad88e177c033a3fc27ccc0&targetDt=" + moviedatea
    r=requests.get(url)
        # 접속에 실패한 경우(status_code가 200이 아닌경우는 모두 에러 간주)
    if r.status_code != 200:
    # 에러코드와 에러메시지 출력
        print('[%d Error] %s' % (r.status_code, r.reason))
        quit()

        # 가져온 결과를 딕셔너리로 변환
    r.encoding='utf-8'
    result=json.loads(r.text)

    sqldata=[(result['boxOfficeResult']['showRange'])[0:8],]
    for i in num:
        sqldata.append(result['boxOfficeResult']['dailyBoxOfficeList'][i]['movieNm'],)
        sqldata.append(result['boxOfficeResult']['dailyBoxOfficeList'][i]['salesAmt'],)
        sqldata.append(result['boxOfficeResult']['dailyBoxOfficeList'][i]['audiCnt'])
        
    print(sqldata)
    insertsql="INSERT INTO `weeklytop3` (date,top_name,top_salesAmt,top_audiCnt,second_name,second_salesAmt,second_audiCnt,third_name,third_salesAmt,third_audiCnt) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"   
    cursor.execute(insertsql, sqldata)
    result = cursor.fetchall()
    print(result)
    juso_db.commit()


    
        

