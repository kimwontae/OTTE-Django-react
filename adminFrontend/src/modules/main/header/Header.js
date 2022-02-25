import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Messages from './messages-dropdown/MessagesDropdown';
import Notifications from './notifications-dropdown/NotificationsDropdown';
import User from './user-dropdown/UserDropdown';

const Header = ({toggleMenuSidebar}) => {
    const [t] = useTranslation();
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={() => toggleMenuSidebar()}
                        type="button"
                        className="nav-link"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        {t('관리자 페이지')}
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="http://localhost:3000/" className="nav-link">
                        {t('메인 페이지')}
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a
                        href="http://192.168.0.41:5601/app/canvas#/workpad/workpad-656c9527-d4b0-422f-a2de-da31b282d1e1/page/1?__fullscreen=true"
                        className="nav-link"
                    >
                        {t('데이터 현황 페이지')}
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                    <button className="nav-link" type="button">
                        <i className="fas fa-search" />
                    </button>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input
                                    className="form-control form-control-navbar"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-navbar"
                                        type="submit"
                                    >
                                        <i className="fas fa-search" />
                                    </button>
                                    <button
                                        className="btn btn-navbar"
                                        type="button"
                                        data-widget="navbar-search"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li> */}
                <Messages />
                <Notifications />
                <User />
            </ul>
        </nav>
    );
};

export default Header;
