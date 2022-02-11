import { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import AuthService from '../services/authService';
import { useHistory } from 'react-router-dom';
import { UserContext } from './../contexts/UserContext';


function Login() {
    let history = useHistory();
    const { setToken } = useContext(UserContext);
    const onFinish = async ({ username, password }) => {
        const response = await AuthService.login(username, password);
        if (response.token) {
            setToken(response.token);
            history.push('/home');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>Login Form</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit"  style={{ float: 'left'}}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;