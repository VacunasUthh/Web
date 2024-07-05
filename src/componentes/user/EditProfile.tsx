import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Radio, DatePicker, Upload, Typography } from "antd";
import {
    UserOutlined,
    IdcardOutlined,
    CalendarOutlined,
    UploadOutlined,
    ManOutlined,
    WomanOutlined,
    HomeOutlined,
    MailOutlined,
    EnvironmentOutlined,
    NumberOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import moment from 'moment';
import { API_URL } from "../../utils/constants";
import { useAuth } from './../AuthContext'; // Assuming useAuth is a custom hook to get the authenticated user
import imgenfe from '../../image/user.png';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const EditProfile: React.FC = () => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${user?._id}`);
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const contentType = response.headers.get('content-type');
                if (!contentType?.includes('application/json')) {
                    throw new Error('Invalid content-type. Expected application/json.');
                }
                
                const data = await response.json(); 
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid data format');
                }
                
                console.log('Fetched user data:', data);
                
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

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            setProfileImage(info.file.originFileObj);
        }
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // Logic to send the updated data to the server
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
            <div style={{ width: '80%', maxWidth: '550px' }}>
                <img src={profileImage || imgenfe} alt="User" style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }} />
                <Title level={2} style={{ margin: 10, textAlign: 'center', fontWeight: 'bold' }}>Editar Perfil</Title>
                <Tabs defaultActiveKey="1" centered style={{ justifyContent: 'center' }}>
                    <TabPane tab="Datos Personales" key="1">
                        <Form
                            form={form}
                            name="edit_personal_data"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            layout="vertical"
                            requiredMark="optional"
                            style={{ width: '110%' }}
                        >
                            <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Datos Personales</Title>

                            {profileImage && (
                                <img src={URL.createObjectURL(profileImage)} alt="profile" style={{ width: '100%', marginBottom: '10px' }} />
                            )}

                            <Text>Foto de perfil: </Text>
                            <Form.Item
                                name="profileImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                            >
                                <Upload
                                    name="profileImage"
                                    listType="picture"
                                    maxCount={1}
                                    onChange={handleImageChange}
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<UploadOutlined />}>Subir Foto</Button>
                                </Upload>
                            </Form.Item>
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
                        </Form>
                    </TabPane>
                    <TabPane tab="Domicilio" key="2">
                        <Form
                            form={form}
                            name="edit_address"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            layout="vertical"
                            requiredMark="optional"
                            style={{ width: '110%' }}
                        >
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
                            <Form.Item style={{ marginBottom: "0px", display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="default" htmlType="button" style={{ width: '48%' }} onClick={() => form.resetFields()}>
                                    Cancelar
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ width: '48%' }}>
                                    Guardar
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default EditProfile;
