import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import BackgroundScreen from '../login/BackgroundScreen';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../utils/constants';

const { Text, Title, Link } = Typography;

const EnterCode: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState<string>(''); // Definir tipo para el código de recuperación

    const handleVerifyCode = async () => {
        const email = (location.state as any)?.email; // Obtener el correo electrónico enviado desde PasswordRecovery

        try {
            const response = await axios.post<{ success: boolean }>(`${API_URL}/emails/validate-code`, { email, code });
            if (response.data.success) {
                message.success('Código verificado correctamente. Puedes restablecer tu contraseña.');
                navigate('/change', { state: { email } }); // Redirigir a la página de reseteo de contraseña
            } else {
                message.error('Código incorrecto. Por favor, verifica el código e inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al verificar código:', error);
            message.error('Ocurrió un error al verificar el código. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <BackgroundScreen>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '80%', maxWidth: '550px' }}>
                    <Title level={2} style={{ margin: 10, textAlign: 'center' }}>Verificar Código de Recuperación</Title>
                    <Form
                        name="enter_code"
                        onFinish={handleVerifyCode}
                        layout="vertical"
                        requiredMark="optional"
                        style={{ width: '100%' }}
                    >
                        <Text>Se ha enviado un código de recuperación a tu correo electrónico.</Text>
                        <div>
                          <Text>Ingresa el código recibido:</Text>  
                        </div>
                        
                        <Form.Item
                            name="code"
                            rules={[
                                { required: true, message: "Por favor ingresa el código de recuperación" }
                            ]}
                        >
                            <Input prefix={<CheckOutlined />} placeholder="Código de Recuperación" onChange={(e) => setCode(e.target.value)}  style={{ width: "100%", padding: "12px" }}  />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Verificar Código
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

export default EnterCode;
