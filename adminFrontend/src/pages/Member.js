/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, MemberTable} from '@components';

const Member = () => {
    return (
        <div>
            <ContentHeader title="테이블 데이터" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">영상물 데이터</h3>
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
                            <MemberTable />
                        </div>
                        <div className="card-footer"> </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Member;
