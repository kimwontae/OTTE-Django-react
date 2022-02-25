import React from 'react';
/* import MovieChart from '../components/rechart-DB/MovieChart'; */
import {ContentHeader} from '@components';
import PieChart from '../components/rechart-DB/PieChart';

const Charts = () => {
    return (
        <div>
            <ContentHeader title="일일 박스오피스 데이터" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                {' '}
                                전일 박스오피스 관람객 수
                            </h3>
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-widget="collapse"
                                    data-toggle="tooltip"
                                    title="Collapse"
                                >
                                    <i className="fa fa-minus" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-widget="remove"
                                    data-toggle="tooltip"
                                    title="Remove"
                                >
                                    <i className="fa fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <PieChart />
                        </div>
                        <div className="card-footer"> </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Charts;
