/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, GraphTests} from '@components';

const Tests = () => {
    return (
        <div>
            <ContentHeader title="주간 박스오피스 데이터" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">주간 Top3 관객수</h3>
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
                            <GraphTests />
                        </div>
                        <div className="card-footer"> </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Tests;
