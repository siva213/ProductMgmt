import { Form, Input, Button } from 'antd';
import AuthService from '../services/authService';
import { useHistory } from 'react-router-dom';

function Register() {
    let history = useHistory();
    const onFinish = async ({ username, password }) => {
        const response = await AuthService.register(username, password);
        if (response.data.success) {
            history.push('/login');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>Sign up Form</h1>
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Register;