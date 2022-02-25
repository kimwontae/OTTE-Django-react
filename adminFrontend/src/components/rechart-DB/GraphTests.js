import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import React, {PureComponent} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

// eslint-disable-next-line consistent-return
const CustomTooltip = ({payload, label, active}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`날짜 : ${label} `}</p>
                <p className="desc">{`1위: ${payload[3].value} : ${payload[0].value}`}</p>
                <p className="desc">{`2위: ${payload[4].value} : ${payload[1].value}`}</p>
                <p className="desc">{`3위: ${payload[5].value} : ${payload[2].value}`}</p>
            </div>
        );
    }
    return null;
};

const Test1 = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:8000/weeklytop3/')
            .then((res) => setData(res.data));
        console.log('데이터', data);
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{
                        fontSize: '15px',
                        backgroundColor: '#95CBFF'
                    }}
                />

                <Bar
                    dataKey="top_audiCnt"
                    fill="#7401DF"
                    barSize={30}
                    label={{position: 'top'}}
                />
                <Bar
                    dataKey="second_audiCnt"
                    fill="#01DFA5"
                    barSize={30}
                    label={{position: 'top'}}
                />
                <Bar
                    dataKey="third_audiCnt"
                    fill="#FFFF00"
                    barSize={30}
                    label={{position: 'top'}}
                />

                <Bar dataKey="top_name" barSize={0} />
                <Bar dataKey="second_name" barSize={0} />
                <Bar dataKey="third_name" barSize={0} />
            </BarChart>
        </div>
    );
};

export default Test1;
