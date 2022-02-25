import json
import urllib.request as ul
from datetime import date, datetime, timedelta

import matplotlib.pyplot as plt
import pandas as pd
import prettytable
import pymysql
import requests
from bs4 import BeautifulSoup
from matplotlib import pyplot as plt
from pandas import DataFrame
from prettyprinter import pprint
from prettytable import PrettyTable
from prettytable.prettytable import HEADER
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from sqlalchemy import create_engine
from tabulate import tabulate

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
gettoday = int(today)

""" plusURL = input('ott 입력(netfilx,wavve,tving,disney,watcha,kino) :') """
ott = ['netflix','wavve','tving','disney','watcha','kino']

for i in ott: 

    sql = "SELECT * FROM `charts_charts` WHERE date = '%s'"+" and ott ='"+i+"';"
    plusURL=i
    print(sql)
    cursor.execute(sql, gettoday)
    result = cursor.fetchall()

    if len(result) != 0:
        print('%s 데이터가 있습니다.'% (i))

    elif len(result) == 0:
        print('%s 데이터가 없습니다. 데이터를 받아옵니다.'% (i))
        driver = webdriver.Edge('./msedgedriver')
        baseURL = 'https://m.kinolights.com/ranking/'

        url = baseURL + i

        driver.get(url)

        pageSource = driver.page_source

        bssource = BeautifulSoup(pageSource, "lxml")

        # titles = bssource.select('.title-text')
        titles = bssource.find_all('span', class_='title-text')

        # for title in titles:
        #    print(title.get_text())

        movie_titles = [title.get_text() for title in titles]

        num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        sqldata = []
            # 1위부터 10위까지 tuple 타입으로 필요한 요소만 담기
        for i in num:
            sqldata.append([plusURL,today,i+1,movie_titles[i]])

        print(sqldata)
        insertsql="INSERT INTO `charts_charts` (ott,date,rank,name) VALUES (%s,%s,%s,%s);"
        print(insertsql)

        # tuple 형태에 담긴만큼 sql문 실행하기


        cursor.executemany(insertsql, sqldata)

        juso_db.commit()
        print("데이터 입력 성공 : "+today+","+plusURL)



""" cursor.execute(sql, gettoday)
result = cursor.fetchall()
pprint(result) """