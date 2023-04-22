import React, { useLayoutEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    DollarCircleOutlined,
    UserOutlined,
    SettingOutlined,
    DownOutlined
} from '@ant-design/icons';
import { HiDocumentText } from 'react-icons/hi';
import { BiSupport } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Layout, Menu, theme, Dropdown, Space, message } from 'antd';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import './LayoutAdmin.scss';
import logo from '../../assets/Image/Admin/Avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../redux/accountSlice/accountSlice';

const { Header, Sider, Content } = Layout;

const items = [
    {
        label: <Link to='/'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <Link to='/rooms'>Quản lý phòng và chi phí</Link>,
        key: 'rooms',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/electrical'>Quản lý chi phí điện nước</Link>,
        key: 'electrical',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/contract'>Quản lý hợp đồng</Link>,
        key: 'contract',
        icon: <HiDocumentText />
    },
    {
        label: <Link to='/authorization'>Quản lý phân quyền</Link>,
        key: 'authorization',
        icon: <UserOutlined />
    },
    {
        label: <Link to='/setting'>Setting</Link>,
        key: 'setting',
        icon: <SettingOutlined />
    },
    {
        label: <Link to='/support'>Hỗ trợ</Link>,
        key: 'support',
        icon: <BiSupport />
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    useLayoutEffect(() => {
        if (window.location.pathname !== '/') {
            setActiveMenu(window.location.pathname.replace('/', ''));
        }
    }, []);
    const { username } = useSelector(state => state.account.user);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        // const res = await callLogout();
        dispatch(doLogoutAction());
        message.success('Đăng xuất thành công');
        nav('/login');

    };


    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];



    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"

        >
            <Sider
                collapsed={collapsed}
                collapsible
                onCollapse={(value) => setCollapsed(value)}
                width={250}
            >
                <div className='logo'>
                    <span>
                        <img src={logo} alt="" />
                    </span>
                    <span className={!collapsed ? 'show' : 'hide'}>Administrator</span>
                </div>
                <Menu
                    selectedKeys={[activeMenu]}
                    theme="dark"
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <Dropdown menu={{ items: itemsDropdown }} >
                        <a onClick={(e) => e.preventDefault()}>
                            Welcome {username}
                            <span className='icon'><IoMdArrowDropdown /></span>
                        </a>
                    </Dropdown>
                </div>

                <Content
                    style={{
                        margin: '12px 16px',
                        minHeight: 280,
                        background: '#f2f3f5',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;