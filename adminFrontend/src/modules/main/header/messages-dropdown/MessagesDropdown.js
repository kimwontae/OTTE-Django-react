import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Dropdown} from '@components';

const MessagesDropdown = () => {
    const [t] = useTranslation();

    return (
        <Dropdown
            isOpen={false}
            size="lg"
            buttonTemplate={
                <>
                    <i className="far fa-comments" />
                    <span className="badge badge-danger navbar-badge">3</span>
                </>
            }
            menuTemplate={
                <>
                    <Link to="/" className="dropdown-item">
                        <div className="media">
                            <img
                                src="/img/default-profile.png"
                                alt="User Avatar"
                                className="img-size-50 mr-3 img-circle"
                            />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                    김원태
                                    <span className="float-right text-sm text-danger">
                                        <i className="fas fa-star" />
                                    </span>
                                </h3>
                                <p className="text-sm">오늘 점심 뭐드실?</p>
                                <p className="text-sm text-muted">
                                    <i className="far fa-clock mr-1" />
                                    <span>
                                        {t('header.messages.ago', {
                                            quantity: '30',
                                            unit: 'Minutes'
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/" className="dropdown-item">
                        <div className="media">
                            <img
                                src="/img/default-profile.png"
                                alt="User Avatar"
                                className="img-size-50 img-circle mr-3"
                            />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                    오세준
                                    <span className="float-right text-sm text-muted">
                                        <i className="fas fa-star" />
                                    </span>
                                </h3>
                                <p className="text-sm">초고속하실분</p>
                                <p className="text-sm text-muted">
                                    <i className="far fa-clock mr-1" />
                                    <span>
                                        {t('header.messages.ago', {
                                            quantity: '3',
                                            unit: 'Hours'
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/" className="dropdown-item">
                        <div className="media">
                            <img
                                src="/img/default-profile.png"
                                alt="User Avatar"
                                className="img-size-50 img-circle mr-3"
                            />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                    이원민
                                    <span className="float-right text-sm text-warning">
                                        <i className="fas fa-star" />
                                    </span>
                                </h3>
                                <p className="text-sm">음~ 맛있다~</p>
                                <p className="text-sm text-muted">
                                    <i className="far fa-clock mr-1" />
                                    <span>
                                        {t('header.messages.ago', {
                                            quantity: '4',
                                            unit: 'Hours'
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/" className="dropdown-item dropdown-footer">
                        {t('header.messages.seeAll')}
                    </Link>
                </>
            }
        />
    );
};

export default MessagesDropdown;
