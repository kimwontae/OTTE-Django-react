import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const date = new Date();
date.setDate(date.getDate() - 7);
const year = date.getFullYear();
const zero = '0';
const a = (zero + String(1 + date.getMonth())).slice(-2);
const b = (zero + String(date.getDate())).slice(-2);
const todaydate = year + a + b;
console.log(b);
console.log(todaydate);
const BarChart1 = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        axios
            .get(
                `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&weekGb=0&targetDt=${todaydate}`
            )
            .then((res) =>
                setData(res.data.boxOfficeResult.weeklyBoxOfficeList)
            );
        // console.log(data);
    }, []);

    return (
        <div>
            <AreaChart
                width={1000}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis
                    dataKey="movieNm"
                    interval={0}
                    angle={15}
                    dx={0}
                    fontSize={10}
                />
                <YAxis domain={[0, 30]} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="salesShare"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="총매출대비 매출비율"
                    domain={[0, 30]}
                />

                <Area
                    type="monotone"
                    dataKey="rank"
                    stroke="#D7DF01"
                    fill="#D7DF01"
                    name="순위"
                />
                <Legend />
            </AreaChart>
        </div>
    );
};

export default BarChart1;
