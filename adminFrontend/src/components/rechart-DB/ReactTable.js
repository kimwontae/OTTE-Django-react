import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from 'recharts';

const date = new Date();
const year = date.getFullYear();
const zero = '0';
const a = zero + String(1 + date.getMonth()).slice(-2);
const b = date.getDate() - 1;
const c = zero + b;
const d = c.slice(-2);
const todaydate = year + a + d;

const ReactTable = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        axios
            .get(
                `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${todaydate}`
            )
            .then((res) =>
                setData(res.data.boxOfficeResult.dailyBoxOfficeList)
            );
        // console.log(data);
    }, []);

    return (
        <div>
            <BarChart
                width={1000}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="movieNm"
                    interval={0}
                    angle={15}
                    dx={0}
                    fontSize={10}
                />
                <YAxis interval={0} dx={0} max={40} domain={[-20, 20]} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="red" />
                <Bar
                    dataKey="salesChange"
                    fill="#58D3F7"
                    name="매출액 증감"
                    label={{position: 'middle'}}
                />
                <Bar
                    dataKey="audiChange"
                    fill="#0101DF"
                    name="관객 수 증감"
                    label={{position: 'middle'}}
                />
            </BarChart>
        </div>
    );
};

export default ReactTable;
