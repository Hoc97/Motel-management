import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Space, message } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './LayoutAdmin.scss';

const { Content, Footer, Sider } = Layout;

const items = [
    {
        label: <Link to='/'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <Link to='/rooms'>Quản lý phòng và chi phí</Link>,
        key: 'room',
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
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/authorization'>Quản lý phân quyền</Link>,
        key: 'authorization',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/setting'>Setting</Link>,
        key: 'setting',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/support'>Hỗ trợ</Link>,
        key: 'support',
        icon: <DollarCircleOutlined />
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    // const user = useSelector(state => state.account.user);

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const handleLogout = async () => {
    //     const res = await callLogout();
    //     if (res && res.data) {
    //         dispatch(doLogoutAction());
    //         message.success('Đăng xuất thành công');
    //         navigate('/');
    //     }
    // };


    // const itemsDropdown = [
    //     {
    //         label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
    //         key: 'account',
    //     },
    //     {
    //         label: <label
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleLogout()}
    //         >Đăng xuất</label>,
    //         key: 'logout',
    //     },

    // ];

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"
        >
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                {/* <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div> */}
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;