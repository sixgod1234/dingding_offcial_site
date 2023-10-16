import React, { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { loginIn } from '../../../api/login'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const data = await loginIn(values)
            const { tokenHead, token } = data
            setLoading(false)
            localStorage.setItem('token', tokenHead + token)
            navigate('/admin/home-detail')
            // console.log('Received values of form: ', data, values);
        } catch (err) {
            setLoading(false)
            message.error('登录失败')
            console.log(err)
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles["login-box"]}>
                <fieldset className={styles["login-contain"]}>
                    <legend className={styles["legend"]}>用户登录</legend>
                    <Form
                        name="normal_login"
                        className={styles["login-form"]}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className={styles["site-form-item-icon"]} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={styles["login-form-forgot"]} href="" onClick={() => navigate('/home')}>
                                跳转主页
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </fieldset>
            </div>
        </div>
    )
}

export default Login