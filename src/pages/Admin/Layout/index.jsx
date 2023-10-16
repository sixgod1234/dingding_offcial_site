import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import headTitle from '../../../assets/images/header_title.png'
import leftHead from '../../../assets/images/left-head.png'
import { Layout, Menu, Button, theme, Dropdown, message } from 'antd';
import { menuData } from './constant'
import { loginOut, getUser, refreshToken } from '../../../api/login'
import { localParse } from '../../../util'

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const mentKey = location.pathname
    // console.log(mentKey)

    useEffect(() => {
        const token = localParse('token')
        if (!token) {
            message.warning('请先登录')
            navigate('/login')
        } else {
            // hanldeGetUser()
            handleRefreshToken()
        }
    }, [])

    const hanldeGetUser = async () => {
        try {
            await getUser()
        } catch (err) {
            console.log(err)
        }
    }

    // 
    const handleRefreshToken = async () => {
        try {
            const { tokenHead, token } = await refreshToken()
            localStorage.setItem('token', tokenHead + token)
        } catch (err) {
            navigate('/login')
            console.log(err)
        }
    }

    const handleLoginOut = async (props) => {
        try {
            await loginOut()
            localStorage.removeItem('token')
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    const items = [{ key: '1', label: '登出' }]

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            {
                localParse('token') && <Layout className={styles['container']}>
                    <Sider trigger={null} collapsible collapsed={collapsed} width={180} className={styles['aside-container']}>
                        <div className={styles["demo-logo-vertical"]}><img src={collapsed ? leftHead : headTitle} alt="公司图标" /></div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={[mentKey]}
                            items={menuData}
                        />
                    </Sider>
                    <Layout className={styles['content-layout']} style={{ marginLeft: collapsed ? '80px' : '180px' }}>
                        <Header className={styles['head-container']}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className={styles['head-button']}
                            />
                            <Dropdown menu={{ items: items, onClick: handleLoginOut }} placement="bottomCenter" arrow overlayClassName="admin-dropdown">
                                <img src={leftHead} alt="用户头像" className={styles['user-icon']} />
                            </Dropdown>
                        </Header>
                        <Content className={styles['content-container']}>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            }
        </>
    );
};
export default AdminLayout