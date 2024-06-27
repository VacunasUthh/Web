import React, { useState } from "react";
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
  LockOutlined,
} from "@ant-design/icons";
import BackgroundScreen from './BackgroundScreen';
import moment from 'moment';
import { API_URL } from "../../utils/constants";
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

import imgenfe from '../../image/user.png';

const TabRegister: React.FC = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      setProfileImage(info.file.originFileObj);
    }
  };

  const onFinishPersonalData = (values: any) => {
    setFormRegister((prev) => ({
      ...prev,
      curp: values.curp,
      name: values.nombre,
      lastName: values.apellidoPaterno,
      motherLastName: values.apellidoMaterno,
      birthDate: values.fechaNacimiento.format("YYYY-MM-DD"),
      gender: values.sexo,
    }));
    setSelectedIndex(1);
  };

  const onFinishAddress = (values: any) => {
    setFormRegister((prev) => ({
      ...prev,
      address: {
        cp: values.codigoPostal,
        state: values.estado,
        city: values.ciudad,
        colony: values.colonia,
        street: values.calle,
        number: values.numero,
      },
    }));
    setSelectedIndex(2);
  };
  const onFinishContact = async (values: any) => {
    setFormRegister((prev) => ({
      ...prev,
      phone: values.telefono,
      email: values.correo,
      password: values.contraseña,
      confirmPassword: values.confirmarContraseña,
    }));
  
    console.log('formRegister:', formRegister);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegister),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Registro exitoso:', responseData);
        navigate('/login');
      } else {
        console.error('Error al registrar:', responseData);
        // Aquí podrías manejar el error mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  const [formRegister, setFormRegister] = useState({
      curp: '...',
      name: '...',
      lastName: '...',
      motherLastName: '...',
      birthDate: 'YYYY-MM-DD',
      gender: '...',
      address: {
        cp: '...',
        state: '...',
        city: '...',
        colony: '...',
        street: '...',
        number: '...',
      },
      phone: '...',
      email: '...',
      password: '...',
      confirmPassword: '...',
      typeUser: 'trabajador', // o 'paciente', dependiendo de tus requisitos
      idWorker: '', // Opcional
      profession: '', // Opcional
      cedula: '', // Opcional
      institution: '', // Opcional
      position: '', // Opcional
    });

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BackgroundScreen>
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
        <div style={{ width: '80%', maxWidth: '550px' }}>
          <img src={imgenfe} alt="User" style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }} />
          <Title level={2} style={{ margin: 10, textAlign: 'center', fontWeight: 'bold' }}>¡Registrate!</Title>
          <Tabs activeKey={String(selectedIndex)} centered style={{ justifyContent: 'center' }} onChange={(key) => setSelectedIndex(Number(key))}>
            <TabPane tab="Datos Personales" key="0">
              <Form
                form={form}
                name="personal_data"
                initialValues={{ remember: true }}
                onFinish={onFinishPersonalData}
                layout="vertical"
                requiredMark="optional"
                style={{ width: '110%' }}
              >
                <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Datos Personales</Title>

                {profileImage && (
                  <img src={URL.createObjectURL(profileImage)} alt="profile" style={{ width: '100%', marginBottom: '10px' }} />
                )}

                {/* Componente de carga de imagen */}
                <Text>Foto de perfil: </Text>
                <Form.Item
                  name="profileImage"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                  rules={[{ required: true, message: "Por favor sube tu foto de perfil" }]}
                >
                  <Upload
                    name="profileImage"
                    listType="picture"
                    maxCount={1}
                    onChange={handleImageChange}
                    beforeUpload={() => false} // Deshabilita la subida automática
                  >
                    <Button icon={<UploadOutlined />}>Subir Foto</Button>
                  </Upload>
                </Form.Item>
                <Text>Curp: </Text>
                <Form.Item
                  name="curp"
                  rules={[{ required: true, message: "Por favor ingresa tu CURP" }]}
                >
                  <Input prefix={<IdcardOutlined />} placeholder="CURP" />
                </Form.Item>
                <Text>Nombre: </Text>
                <Form.Item
                  name="nombre"
                  rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Nombre" />
                </Form.Item>
                <Text>Apellido Paterno: </Text>
                <Form.Item
                  name="apellidoPaterno"
                  rules={[{ required: true, message: "Por favor ingresa tu apellido paterno" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Apellido Paterno" />
                </Form.Item>
                <Text>Apellido Materno: </Text>
                <Form.Item
                  name="apellidoMaterno"
                  rules={[{ required: true, message: "Por favor ingresa tu apellido materno" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Apellido Materno" />
                </Form.Item>
                <Text>Fecha de Nacimiento: </Text>
                <Form.Item
                  name="fechaNacimiento"
                  rules={[{ required: true, message: "Por favor ingresa tu fecha de nacimiento" }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Fecha de nacimiento"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>

                <Text>Sexo: </Text>
                <Form.Item
                  name="sexo"
                  rules={[{ required: true, message: "Por favor selecciona tu sexo" }]}
                >
                  <Radio.Group>
                    <Radio value="masculino"><ManOutlined /> Masculino</Radio>
                    <Radio value="femenino"><WomanOutlined /> Femenino</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item style={{ marginBottom: "0px" }}>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Siguiente
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Domicilio" key="1">
              <Form
                form={form}
                name="address"
                initialValues={{ remember: true }}
                onFinish={onFinishAddress}
                layout="vertical"
                requiredMark="optional"
                style={{ width: '110%' }}
              >
                <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Domicilio</Title>
                <Text>Código Postal: </Text>
                <Form.Item
                  name="codigoPostal"
                  rules={[{ required: true, message: "Por favor ingresa tu código postal" }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Código Postal" />
                </Form.Item>
                <Text>Estado: </Text>
                <Form.Item
                  name="estado"
                  rules={[{ required: true, message: "Por favor ingresa tu estado" }]}
                >
                  <Input prefix={<EnvironmentOutlined />} placeholder="Estado" />
                </Form.Item>
                <Text>Ciudad: </Text>
                <Form.Item
                  name="ciudad"
                  rules={[{ required: true, message: "Por favor ingresa tu ciudad" }]}
                >
                  <Input prefix={<NumberOutlined />} placeholder="Ciudad" />
                </Form.Item>
                <Text>Colonia: </Text>
                <Form.Item
                  name="colonia"
                  rules={[{ required: true, message: "Por favor ingresa tu colonia" }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Colonia" />
                </Form.Item>
                <Text>Calle: </Text>
                <Form.Item
                  name="calle"
                  rules={[{ required: true, message: "Por favor ingresa tu calle" }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Calle" />
                </Form.Item>
                <Text>Número: </Text>
                <Form.Item
                  name="numero"
                  rules={[{ required: true, message: "Por favor ingresa tu número" }]}
                >
                  <Input prefix={<NumberOutlined />} placeholder="Número" />
                </Form.Item>
                <Form.Item style={{ marginBottom: "0px", display: 'flex', justifyContent: 'space-between' }}>
                  <Button type="default" htmlType="button" style={{ width: '50%' }} onClick={() => setSelectedIndex(0)}>
                    Atrás
                  </Button>
                  <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
                    Siguiente
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Contacto" key="2">
              <Form
                form={form}
                name="contact"
                initialValues={{ remember: true }}
                onFinish={onFinishContact}
                layout="vertical"
                requiredMark="optional"
                style={{ width: '110%' }}
              >
                <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Seguridad</Title>
                <Text>Teléfono: </Text>
                <Form.Item
                  name="telefono"
                  rules={[{ required: true, message: "Por favor ingresa tu teléfono" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
                </Form.Item>
                <Text>Correo: </Text>
                <Form.Item
                  name="correo"
                  rules={[{ required: true, message: "Por favor ingresa tu correo" }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Correo" />
                </Form.Item>
                <Text>Contraseña: </Text>
                <Form.Item
                  name="contraseña"
                  rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                </Form.Item>
                <Text>Confirmar Contraseña: </Text>
                <Form.Item
                  name="confirmarContraseña"
                  rules={[{ required: true, message: "Por favor confirma tu contraseña" }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" />
                </Form.Item>
                <Form.Item style={{ marginBottom: "0px", display: 'flex', justifyContent: 'space-between' }}>
                  <Button type="default" htmlType="button" style={{ width: '48%' }} onClick={() => setSelectedIndex(1)}>
                    Atrás
                  </Button>
                  <Button type="primary" htmlType="submit" style={{ width: '48%' }}>
                    Registrar
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </BackgroundScreen>
  );
};

export default TabRegister;
