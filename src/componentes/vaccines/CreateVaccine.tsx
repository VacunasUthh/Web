import React, { useState, useEffect } from 'react';
import { message, Form, Input, Button, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateVaccine: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get(`${API_URL}/vaccine-month`);
        // Ordenar los meses numéricamente de menor a mayor
        const sortedMonths = response.data.sort((a: any, b: any) => a.month - b.month);
        setMonths(sortedMonths);
      } catch (error) {
        console.error('Error loading months:', error);
        message.error('Error cargando los meses de vacunación');
      }
    };

    fetchMonths();
  }, []);

  const handleSubmit = async (values: any) => {
    const vaccineData = {
      ...values,
      disease: values.disease.split(',').map((item: string) => item.trim()), 
      contraindications: values.contraindications.split(',').map((item: string) => item.trim()), 
      images: imageUrl, 
    };

    try {
      const response = await axios.post(`${API_URL}/vaccines`, vaccineData);
      const createdVaccine = response.data;

      const selectedMonths = values.month;

      await axios.put(`${API_URL}/vaccines/months`, {
        vaccineId: createdVaccine._id,
        monthIds: selectedMonths,
      });

      message.success('Vacuna creada y asignada correctamente a los meses seleccionados', 3);
      navigate('/vaccines');
    } catch (error) {
      console.error('Error creating vaccine:', error);
      message.error('Error al crear la vacuna');
    }
  };

  const showCloudinaryWidget = () => {
    window.cloudinary.createUploadWidget({
      cloudName: 'dwxlvv6lq',
      uploadPreset: 'vacunas',
    }, (error: any, result: any) => {
      if (!error && result && result.event === 'success') {
        setImageUrl(result.info.secure_url);
      }
    }).open();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Crear Vacuna</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="Imagen"
          name="image"
        >
          <div>
            <Button type="primary" onClick={showCloudinaryWidget}>
              Subir Imagen
            </Button>
            {imageUrl && <img src={imageUrl} alt="Imagen de la vacuna" style={{ width: '100%', marginTop: '10px' }} />}
          </div>
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la vacuna!' }]}
        >
          <Input placeholder="Nombre de la vacuna" />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message: 'Por favor ingresa la descripción de la vacuna!' }]}
        >
          <TextArea placeholder="Descripción de la vacuna" rows={4} />
        </Form.Item>

        <Form.Item
          label="Enfermedad"
          name="disease"
          rules={[{ required: true, message: 'Por favor ingresa las enfermedades separadas por comas!' }]}
        >
          <Input placeholder="Enfermedad (separar por comas)" />
        </Form.Item>

        <Form.Item
          label="Población"
          name="town"
          rules={[{ required: true, message: 'Por favor selecciona la población!' }]}
        >
          <Select mode="multiple" placeholder="Selecciona la población">
            <Option value="Niños">Niños</Option>
            <Option value="Adolescentes">Adolescentes</Option>
            <Option value="Adultos">Adultos</Option>
            <Option value="Adultos Mayores">Adultos Mayores</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Advertencias"
          name="contraindications"
          rules={[{ required: true, message: 'Por favor ingresa las advertencias separadas por comas!' }]}
        >
          <Input placeholder="Advertencias (separar por comas)" />
        </Form.Item>

        <Form.Item
          label="Área de aplicación"
          name="area"
          rules={[{ required: true, message: 'Por favor selecciona el área de aplicación!' }]}
        >
          <Select mode="multiple" placeholder="Selecciona el área de aplicación">
            <Option value="Brazo derecho">Brazo derecho</Option>
            <Option value="Brazo izquierdo">Brazo izquierdo</Option>
            <Option value="Pierna derecha">Pierna derecha</Option>
            <Option value="Pierna izquierda">Pierna izquierda</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Gravedad"
          name="gravity"
          rules={[{ required: true, message: 'Por favor selecciona la gravedad!' }]}
        >
          <Select placeholder="Selecciona la gravedad">
            <Option value="Baja">Baja</Option>
            <Option value="Regular">Regular</Option>
            <Option value="Alta">Alta</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mes de aplicación"
          name="month"
          rules={[{ required: true, message: 'Por favor selecciona el mes de aplicación!' }]}
        >
          <Select mode="multiple" placeholder="Selecciona el mes de aplicación">
            {months.map((month: any) => (
              <Option key={month._id} value={month._id}>{month.month}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Crear Vacuna
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateVaccine;
