import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import imgenfe from '../../image/user.png';
import BackgroundScreen from './BackgroundScreen';
import { useAuth } from './../AuthContext'; // Ajusta la ruta según corresponda
const { Text, Title, Link } = Typography;

const TabLogin: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (values: any) => {
        const { username, password } = values;
        if (username && password) {
            try {
                const response = await fetch(`https://vaccinationapi.vercel.app/users/loginWeb`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    login(data.email, data._id);
                    message.success('Inicio de sesión exitoso.');
                } else {
                    const data = await response.json();
                    if (data.message === 'Acceso denegado para pacientes.') {
                        message.error('Acceso denegado: No tienes permiso para ingresar como paciente.');
                    } else {
                        message.error(data.message || 'Error al iniciar sesión');
                    }
                }
            } catch (error) {
                message.error('Error en la solicitud de inicio de sesión: ' + error);
            }
        }
    };

    return (
        <BackgroundScreen>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', maxWidth: '550px' }}>
                    <img src={imgenfe} alt="User" style={{ width: '100px', height: '100px', marginBottom: '20px', display: 'block', margin: '0 auto' }} />
                    <Title level={2} style={{ margin: 10, textAlign: 'center' }}>¡Bienvenido al sistema!</Title>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <Text>Accede y gestiona vacunaciones con facilidad.</Text>
                    </div>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        layout="vertical"
                        requiredMark="optional"
                        style={{ width: '100%' }}
                    >
                        <Text>Usuario: </Text>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Por favor ingresa tu correo" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Usuario" />
                        </Form.Item>
                        <Text>Contraseña:</Text>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Recordar</Checkbox>
                            </Form.Item>
                            <Link href="/recovery" style={{ float: "right" }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Iniciar sesión
                            </Button>
                            <div style={{ marginTop: "16px", textAlign: "center" }}>
                                <Text>¿No tienes una cuenta? </Text>
                                <Link href="register">Regístrate ahora</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </BackgroundScreen>
    );
};

export default TabLogin;
