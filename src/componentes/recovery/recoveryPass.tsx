import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BackgroundScreen from '../login/BackgroundScreen';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../utils/constants';

const { Text, Title, Link } = Typography;

const PasswordRecovery: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');

    const handleRecovery = async () => {
        try {
            const response = await axios.post<{ success: boolean }>(`${API_URL}/emails/send-recovery-code`, { email });
            if (response.data.success) {
                message.success('Código enviado. Revisa tu correo electrónico para el código de recuperación.');
                navigate('/code', { state: { email } });
            } else {
                message.error('No se pudo enviar el correo. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al enviar correo:', error);
            message.error('Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <BackgroundScreen>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', maxWidth: '550px' }}>
                    <Title level={2} style={{ margin: 10, textAlign: 'center' }}>Recuperar Contraseña</Title>
                    <Form
                        name="password_recovery"
                        onFinish={handleRecovery}
                        layout="vertical"
                        requiredMark="optional"
                        style={{ width: '100%' }}
                    >
                        <Text>Ingresa tu correo electrónico:</Text>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Por favor ingresa tu correo electrónico" },
                                { type: 'email', message: 'Por favor ingresa un correo electrónico válido' }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Correo Electrónico" onChange={(e) => setEmail(e.target.value)}  style={{ width: "100%", padding: "12px" }}  />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Enviar
                            </Button>
                            <div style={{ marginTop: "16px", textAlign: "center" }}>
                                <Link href="/">Cancelar</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </BackgroundScreen>
    );
};

export default PasswordRecovery;
