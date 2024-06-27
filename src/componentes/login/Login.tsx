import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import imgenfe from '../../image/user.png';
import BackgroundScreen from './BackgroundScreen';
const { Text, Title, Link } = Typography;
import { useNavigate } from 'react-router-dom';

const TabLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (values: any) => { // Adjusted to accept values from the form
        const { username, password } = values; // Destructure username and password from values
        if (username && password) { // Ensure username and password are not empty
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
                    alert('Inicio de sesión exitoso.');
                    localStorage.setItem('email', data.email);
                    navigate('/main'); // Navigate to main page on successful login
                } else {
                    const data = await response.json();
                    alert('Error en el inicio de sesión');
                    if (data.message === 'Acceso denegado para pacientes.') {
                        alert('Acceso denegado: No tienes permiso para ingresar como paciente.');
                    } else {
                        console.log(data.message || 'Error al iniciar sesión');
                    }
                }
            } catch (error) {
                console.log('Error en la solicitud de inicio de sesión: ' + error);
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
                        onFinish={handleLogin} // Use handleLogin directly for onFinish
                        layout="vertical"
                        requiredMark="optional"
                        style={{ width: '100%' }}
                    >
                        <Text>Usuario: </Text>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Por favor ingresa tu usuario" }]}
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
                            <Link href="/" style={{ float: "right" }}>
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
