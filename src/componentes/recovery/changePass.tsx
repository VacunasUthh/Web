import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import BackgroundScreen from '../login/BackgroundScreen';

const { Text, Title } = Typography;

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleResetPassword = async () => {
        const email = (location.state as any)?.email;

        try {
            const response = await axios.post(`${API_URL}/users/reset-password`, { email, newPassword: password });
            if (response.data.success) {
                message.success('Contraseña restablecida exitosamente.');
                navigate('/'); // Redirigir a la página de inicio de sesión después de cambiar la contraseña
            } else {
                message.error('Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al restablecer contraseña:', error);
            message.error('Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <BackgroundScreen>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', maxWidth: '550px' }}>
                    <Title level={2} style={{ margin: 10, textAlign: 'center' }}>Cambiar Contraseña</Title>
                    <Form
                        name="change_password"
                        onFinish={handleResetPassword}
                        layout="vertical"
                        requiredMark="optional"
                        style={{ width: '100%' }}
                    >
                        <Text>Nueva contraseña:</Text>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Por favor ingresa tu nueva contraseña" },
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número' }
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Nueva Contraseña" onChange={(e) => setPassword(e.target.value)}   style={{ width: "100%", padding: "12px" }} />
                        </Form.Item>
                        <Text>Confirmar contraseña:</Text>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Por favor confirma tu nueva contraseña" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Confirmar Nueva Contraseña" onChange={(e) => setConfirmPassword(e.target.value)}   style={{ width: "100%", padding: "12px" }}  />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Cambiar Contraseña
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </BackgroundScreen>
    );
};

export default ChangePassword;
