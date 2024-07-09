import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Radio, DatePicker, Upload, Typography, Select } from "antd";
import { UserOutlined, IdcardOutlined, CalendarOutlined, UploadOutlined, ManOutlined, WomanOutlined, HomeOutlined, MailOutlined, EnvironmentOutlined, NumberOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import BackgroundScreen from './BackgroundScreen';
import { API_URL } from "../../utils/constants";
import { useNavigate } from 'react-router-dom';
import imgenfe from '../../image/user.png';

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Define interfaces for the data
interface Address {
  cp: string;
  state: string;
  city: string;
  colony: string;
  street: string;
  number: string;
}

interface FormRegister {
  curp: string;
  name: string;
  lastName: string;
  motherLastName: string;
  birthDate: string;
  gender: string;
  address: Address;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  typeUser: string;
  idWorker?: string;
  profession?: string;
  cedula?: string;
  institution?: string;
  position?: string;
}

interface Cities {
  [key: string]: string[];
}

interface Colonies {
  [key: string]: string[];
}

const TabRegister: React.FC = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formRegister, setFormRegister] = useState<FormRegister>({
    curp: '',
    name: '',
    lastName: '',
    motherLastName: '',
    birthDate: '',
    gender: '',
    address: {
      cp: '',
      state: '',
      city: '',
      colony: '',
      street: '',
      number: '',
    },
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    typeUser: 'trabajador', // or 'paciente', depending on your requirements
    idWorker: '', // Optional
    profession: '', // Optional
    cedula: '', // Optional
    institution: '', // Optional
    position: '', // Optional
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [states, setStates] = useState<string[]>([]); // Ensure this is a string array
  const [cities, setCities] = useState<Cities>({});
  const [colonies, setColonies] = useState<Colonies>({});
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load states and cities
    const loadStatesAndCities = async () => {
      try {
        const statesResponse = await fetch('/src/utils/ciudades.json');
        const statesData: Cities = await statesResponse.json();
        setStates(Object.keys(statesData)); // This should work if statesData is a Cities object
        setCities(statesData);
      } catch (error) {
        console.error('Error loading states and cities:', error);
      }
    };

    // Load colonies
    const loadColonies = async () => {
      try {
        const coloniesResponse = await fetch('/src/utils/colonias.json');
        const coloniesData: Colonies = await coloniesResponse.json();
        setColonies(coloniesData);
      } catch (error) {
        console.error('Error loading colonies:', error);
      }
    };

    loadStatesAndCities();
    loadColonies();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setSelectedCity(''); // Reset city when state changes
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      // Optionally, reset selected colony when city changes
    }
  }, [selectedCity]);

  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      setProfileImage(info.file.originFileObj);
    }
  };

  const onFinishPersonalData = (values: any) => {
    console.log("Personal Data:", values); // Verifica los datos recibidos
    setFormRegister((prev) => ({
      ...prev,
      curp: values.curp || '',
      name: values.nombre || '',
      lastName: values.apellidoPaterno || '',
      motherLastName: values.apellidoMaterno || '',
      birthDate: values.fechaNacimiento ? values.fechaNacimiento.format("YYYY-MM-DD") : '', // Verifica el formato correcto
      gender: values.sexo || '',
    }));
    setSelectedIndex(1);
  };
  
  const onFinishAddress = (values: any) => {
    console.log("Address Data:", values); // Verifica los datos recibidos
    setFormRegister((prev) => ({
      ...prev,
      address: {
        cp: values.codigoPostal || '',
        state: values.estado || '',
        city: values.ciudad || '',
        colony: values.colonia || '',
        street: values.calle || '',
        number: values.numero || '',
      },
    }));
    setSelectedIndex(2);
  };
  
  const onFinishContact = async (values: any) => {
    console.log("Contact Data:", values); // Verifica los datos recibidos
    const updatedFormRegister: FormRegister = {
      ...formRegister,
      phone: values.telefono || '',
      email: values.correo || '',
      password: values.contraseña || '',
      confirmPassword: values.confirmarContraseña || '',
    };
  
    try {
      console.log("Form Register:", updatedFormRegister); // Verifica el estado final antes de enviarlo
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormRegister),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      if (response.ok) {
        console.log('Registration successful:', responseData);
        navigate('/');
      } else {
        console.error('Error registering:', responseData);
        // Handle errors
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };
  
  

  return (
    <BackgroundScreen>
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
        <div style={{ width: '80%', maxWidth: '550px' }}>
          <img src={imgenfe} alt="User" style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }} />
          <Title level={2} style={{ margin: 10, textAlign: 'center', fontWeight: 'bold' }}>¡Regístrate!</Title>
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
                >
                  <Input prefix={<IdcardOutlined />} placeholder="CURP" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Nombre: </Text>
                <Form.Item
                  name="nombre"
                >
                  <Input prefix={<UserOutlined />} placeholder="Nombre" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Apellido Paterno: </Text>
                <Form.Item
                  name="apellidoPaterno"
                >
                  <Input prefix={<UserOutlined />} placeholder="Apellido Paterno" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Apellido Materno: </Text>
                <Form.Item
                  name="apellidoMaterno"
                >
                  <Input prefix={<CalendarOutlined />} placeholder="Apellido Materno" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Form.Item
                  name="fechaNacimiento"
                >
                  <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="sexo" label="Sexo" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value="Masculino">Masculino</Radio>
                    <Radio value="Femenino">Femenino</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Siguiente</Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Dirección" key="1">
              <Form
                form={form}
                name="address"
                initialValues={{ remember: true }}
                onFinish={onFinishAddress}
                layout="vertical"
                requiredMark="optional"
                style={{ width: '110%' }}
              >
                <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Dirección</Title>
                <Text>Código Postal: </Text>
                <Form.Item
                  name="codigoPostal"
                >
                  <Input prefix={<NumberOutlined />} placeholder="Código Postal" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Estado: </Text>
                <Form.Item name="estado" rules={[{ required: true }]}>
                  <Select
                    placeholder="Selecciona un estado"
                    onChange={(value) => setSelectedState(value)}
                  >
                    {states.map(state => (
                      <Option key={state} value={state}>{state}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Text>Ciudad: </Text>
                <Form.Item name="ciudad" rules={[{ required: true }]}>
                  <Select
                    placeholder="Selecciona una ciudad"
                    onChange={(value) => setSelectedCity(value)}
                  >
                    {selectedState && cities[selectedState]?.map(city => (
                      <Option key={city} value={city}>{city}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Text>Colonia: </Text>
                <Form.Item name="colonia" rules={[{ required: true }]}>
                  <Select placeholder="Selecciona una colonia">
                    {selectedCity && colonies[selectedCity]?.map(colony => (
                      <Option key={colony} value={colony}>{colony}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Text>Calle: </Text>
                <Form.Item
                  name="calle"
                >
                  <Input prefix={<HomeOutlined />} placeholder="Calle" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Número: </Text>
                <Form.Item
                  name="numero"
                >
                  <Input prefix={<NumberOutlined />} placeholder="Número" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Siguiente</Button>
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
                <Title level={4} style={{ marginTop: '1px', textAlign: 'center' }}>Contacto</Title>
                <Text>Teléfono: </Text>
                <Form.Item
                  name="telefono"
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Teléfono" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Correo Electrónico: </Text>
                <Form.Item
                  name="correo"
                >
                  <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Contraseña: </Text>
                <Form.Item
                  name="contraseña"
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Text>Confirmar Contraseña: </Text>
                <Form.Item
                  name="confirmarContraseña"
                  rules={[{ required: true, message: 'Por favor confirma tu contraseña!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" style={{ width: "100%", padding: "12px" }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Registrarse</Button>
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
