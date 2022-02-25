import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const MovieChart = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:8000/boxapi/')
            .then((res) => setData(res.data));
    }, []);
    console.log(JSON.stringify(data));
    return (
        <div>
            <LineChart
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
                <XAxis dataKey="movieNm" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="audiAcc"
                    stroke="#8884d8"
                    activeDot={{r: 8}}
                />
                <Line type="monotone" dataKey="audiCnt" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default MovieChart;
