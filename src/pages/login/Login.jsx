import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { callLogin } from '../../services/api';
import { useState } from 'react';
import { setCookie } from '../../components/common/Common';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/accountSlice/accountSlice';
const LoginPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values) => {
        const { username, password } = values;
        console.log('value', values);
        setIsLoading(true);
        let res = await callLogin(username, password);
        console.log('res', res);

        if (res?.status === 200) {
            localStorage.setItem('access_token', res.data.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data));
            //setCookie 1day = 24hours
            setCookie('refreshToken', res.data.refreshToken, 24);
            dispatch(doLoginAction(res.data));
            setTimeout(() => {
                message.success('Đăng nhập tài khoản thành công!');
                setIsLoading(false);
                nav('/');
            }, 1000);
        } else {
            notification.error({
                message: "Thông tin đăng nhập không chính xác",
                duration: 5
            });
            setIsLoading(false);
        }
    };
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email/SĐT"
                                name="username"
                                rules={[{ required: true, message: 'Email/SĐT không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;