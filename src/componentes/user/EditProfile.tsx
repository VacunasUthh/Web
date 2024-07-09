import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Radio, DatePicker, Typography, message } from "antd";
import {
    UserOutlined,
    IdcardOutlined,
    ManOutlined,
    WomanOutlined,
    MailOutlined,
    EnvironmentOutlined,
    NumberOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import moment from 'moment';
import { API_URL } from "../../utils/constants";
import { useAuth } from './../AuthContext';
import imgenfe from '../../image/user.png';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const EditProfile: React.FC = () => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${user?._id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
                form.setFieldsValue({
                    curp: data.curp,
                    nombre: data.name,
                    apellidoPaterno: data.lastName,
                    apellidoMaterno: data.motherLastName,
                    fechaNacimiento: moment(data.birthDate),
                    sexo: data.gender,
                    codigoPostal: data.address?.cp,
                    estado: data.address?.state,
                    ciudad: data.address?.city,
                    colonia: data.address?.colony,
                    calle: data.address?.street,
                    numero: data.address?.number,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchUserData();
        }
    }, [user, form]);

    interface ClientData {
        curp?: string;
        nombre?: string; // Correspondiente a 'name' en el servidor
        apellidoPaterno?: string; // Correspondiente a 'lastName' en el servidor
        apellidoMaterno?: string; // Correspondiente a 'motherLastName' en el servidor
        fechaNacimiento?: string; // Correspondiente a 'birthDate' en el servidor
        sexo?: string; // Correspondiente a 'gender' en el servidor
        // Agrega otros campos según sea necesario
    }
    const mapToServerFields = (clientData: ClientData) => {
        return {
            curp: clientData.curp,
            name: clientData.nombre, // Mapeado desde español a inglés
            lastName: clientData.apellidoPaterno,
            motherLastName: clientData.apellidoMaterno,
            birthDate: clientData.fechaNacimiento,
            gender: clientData.sexo
            // Agrega otros campos según sea necesario
        };
    };


    const onFinish = async (values: ClientData) => {
        try {
            const updates = mapToServerFields(values);
    
            const response = await fetch(`${API_URL}/users/actualizar/${user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const updatedUser = await response.json();
            message.success('Información actualizada correctamente');
    
            setUserData(updatedUser);
            form.setFieldsValue({
                curp: updatedUser.curp,
                nombre: updatedUser.name,
                apellidoPaterno: updatedUser.lastName,
                apellidoMaterno: updatedUser.motherLastName,
                sexo: updatedUser.gender,
                codigoPostal: updatedUser.address?.cp,
                estado: updatedUser.address?.state,
                ciudad: updatedUser.address?.city,
                colonia: updatedUser.address?.colony,
                calle: updatedUser.address?.street,
                numero: updatedUser.address?.number,
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            message.error('Error actualizando la información');
        }
    };
    





    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
            <div style={{ width: '80%', maxWidth: '550px' }}>
                <img src={imgenfe} alt="User" style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }} />
                <Title level={2} style={{ margin: 10, textAlign: 'center', fontWeight: 'bold' }}>Editar Perfil</Title>
                <Form
                    form={form}
                    name="edit_profile"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                    style={{ width: '100%' }}
                >
                    <Tabs defaultActiveKey="1" centered style={{ justifyContent: 'center' }}>
                        <TabPane tab="Datos Personales" key="1">
                            <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Datos Personales</Title>
                            <Text>Curp: </Text>
                            <Form.Item name="curp">
                                <Input prefix={<IdcardOutlined />} placeholder="CURP" />
                            </Form.Item>
                            <Text>Nombre: </Text>
                            <Form.Item name="nombre">
                                <Input prefix={<UserOutlined />} placeholder="Nombre" />
                            </Form.Item>
                            <Text>Apellido Paterno: </Text>
                            <Form.Item name="apellidoPaterno">
                                <Input prefix={<UserOutlined />} placeholder="Apellido Paterno" />
                            </Form.Item>
                            <Text>Apellido Materno: </Text>
                            <Form.Item name="apellidoMaterno">
                                <Input prefix={<UserOutlined />} placeholder="Apellido Materno" />
                            </Form.Item>
                            <Text>Fecha de Nacimiento: </Text>
                            <Form.Item name="fechaNacimiento">
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                            <Text>Sexo: </Text>
                            <Form.Item name="sexo">
                                <Radio.Group>
                                    <Radio value="Masculino"><ManOutlined /> Masculino</Radio>
                                    <Radio value="Femenino"><WomanOutlined /> Femenino</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Domicilio" key="2">
                            <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Domicilio</Title>
                            <Text>Código Postal: </Text>
                            <Form.Item name="codigoPostal">
                                <Input prefix={<MailOutlined />} placeholder="Código Postal" />
                            </Form.Item>
                            <Text>Estado: </Text>
                            <Form.Item name="estado">
                                <Input prefix={<EnvironmentOutlined />} placeholder="Estado" />
                            </Form.Item>
                            <Text>Ciudad: </Text>
                            <Form.Item name="ciudad">
                                <Input prefix={<NumberOutlined />} placeholder="Ciudad" />
                            </Form.Item>
                            <Text>Colonia: </Text>
                            <Form.Item name="colonia">
                                <Input prefix={<HomeOutlined />} placeholder="Colonia" />
                            </Form.Item>
                            <Text>Calle: </Text>
                            <Form.Item name="calle">
                                <Input prefix={<HomeOutlined />} placeholder="Calle" />
                            </Form.Item>
                            <Text>Número: </Text>
                            <Form.Item name="numero">
                                <Input prefix={<NumberOutlined />} placeholder="Número" />
                            </Form.Item>
                        </TabPane>
                    </Tabs>
                    <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditProfile;
