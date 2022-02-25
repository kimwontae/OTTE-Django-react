import React from 'react';
import SmallBox from '../components/small-box/SmallBox';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        title="영화 정보"
                        type="info"
                        icon="ion-clipboard"
                        navigateTo="/table1"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        title="일일 박스오피스 정보"
                        type="success"
                        icon="ion-ios-pie-outline"
                        navigateTo="/daily-chart1"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        title="주간 박스오피스 정보"
                        type="warning"
                        navigateTo="/weekly-chart1"
                        icon="ion-ios-pie"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        icon="ion-android-film"
                        title="오늘의 OTT / TOP10"
                        type="danger"
                        navigateTo="/table2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
