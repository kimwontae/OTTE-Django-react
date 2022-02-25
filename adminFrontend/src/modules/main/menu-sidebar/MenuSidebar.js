import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export const MENU = [
    {
        name: '메인 페이지',
        path: '/'
    },
    {
        name: '일일 박스오피스',
        children: [
            {
                name: ' 전일 관람객 수',
                path: '/daily-chart1'
            },

            {
                name: ' 총 관객수 / 당일 관객수',
                path: '/daily-chart2'
            },
            {
                name: ' 전일 대비 매출액 / 관객수 증감 비율',
                path: '/daily-chart3'
            }
        ]
    },
    {
        name: '주간 박스오피스',
        children: [
            {
                name: ' 주간 매출비율 / 순위',
                path: '/weekly-chart1'
            },

            {
                name: ' 전주대비 순위 변화',
                path: '/weekly-chart2'
            },
            {
                name: ' 주간 탑3 관람객 수',
                path: '/weekly-chart3'
            }
        ]
    },
    {
        name: '데이터 테이블',
        children: [
            {
                name: ' 영상물 테이블',
                path: '/table1'
            },
            {
                name: ' OTT TOP10 테이블',
                path: '/table2'
            }
        ]
    }
];

const MenuSidebar = () => {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <aside className="main-sidebar sidebar-dark-yellow elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">ADMIN_OTTE</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {user.email}
                        </Link>
                    </div>
                </div>
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                    >
                        {MENU.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
