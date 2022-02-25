import React, { Component } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class LineCharts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      responseFPList: "",
      append_FPList: "",
    };
  }

  componentDidMount() {
    this.callFloatPopulListApi();
  }

  callFloatPopulListApi = async () => {
    const id_props = this.props;
    console.log("모달 파라미터 = ", id_props.title);
    axios
      .post(`http://127.0.0.1:8000/insertcnt/rank/`, {
        id: id_props.title,
      })
      //데이터 나오는곳
      // alert("메롱")
      .then((response) => {
        try {
          this.setState({ responseFPList: response });
          // this.setState({ append_FPList: this.FloatPopulListAppend() });
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
        return false;
      });
  };

  render() {
    return (
      <div
        style={{
          paddingBottom: "56.25%" /* 16:9 */,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "180%",
            height: "130%",
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={this.state.responseFPList.data}
              margin={{
                top: 30,
                right: 10,
                left: -20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sysdate" />
              <YAxis dataKey="rank" reversed="false" domain={[1, 20]} />
              <Tooltip />
              <Legend align="center" verticalAlign="bottom" height={10} />
              <Line dataKey="rank" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default LineCharts;
