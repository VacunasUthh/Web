import React, { useEffect, useState } from 'react';
import { message, Form, Input, DatePicker, Button, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Vaccine {
  id: number;
  name: string;
}

interface Cities {
  [state: string]: string[];
}

interface Colonies {
  [city: string]: string[];
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateCampaign: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [vaccineOptions, setVaccineOptions] = useState<Vaccine[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<Cities>({});
  const [colonies, setColonies] = useState<Colonies>({});
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [coloniesAvailable, setColoniesAvailable] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadStatesAndCities = async () => {
      try {
        const statesResponse = await fetch('/src/utils/ciudades.json');
        const statesData: Cities = await statesResponse.json();
        setStates(Object.keys(statesData));
        setCities(statesData);
      } catch (error) {
        console.error('Error loading states and cities:', error);
      }
    };

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
    const fetchVaccines = async () => {
      try {
        const response = await axios.get<Vaccine[]>(`${API_URL}/vaccines`);
        const vaccines = response.data;
        setVaccineOptions(vaccines);
      } catch (error) {
        message.error('Error al cargar las vacunas');
      }
    };

    fetchVaccines();
  }, []);

  const handleSubmit = (values: any) => {
    const _id = localStorage.getItem('userId');
    const campaignData = {
      ...values,
      images: imageUrl, // Añadimos la URL de la imagen
      assignednurse: _id,
    };

    axios.post(`${API_URL}/campaigns`, campaignData)
      .then(response => {
        message.success('Campaña creada correctamente', 3);
        navigate('/campaings');
      })
      .catch(error => {
        message.error('Error al crear la campaña');
      });
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setColoniesAvailable(!!colonies[value]);
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
      <Title level={2}>Campaña de Vacunación</Title>
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
            {imageUrl && <img src={imageUrl} alt="Imagen de la campaña" style={{ width: '100%', marginTop: '10px' }} />}
          </div>
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la campaña!' }]}
        >
          <Input placeholder="Nombre de la campaña" />
        </Form.Item>

        <Form.Item
          label="Vacunas"
          name="vaccines"
          rules={[{ required: true, message: 'Selecciona la vacuna' }]}
        >
          <Select placeholder="Selecciona una vacuna">
            {vaccineOptions.map((vaccine) => (
              <Option key={vaccine.id} value={vaccine.name}>
                {vaccine.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Edad"
          name="age"
          rules={[{ required: true, message: 'Ingresa la Edad' }]}
        >
          <Input placeholder="Edad" />
        </Form.Item>

        <Form.Item
          label="Fecha Inicio"
          name="startdate"
          rules={[{ required: true, message: 'Ingresa la fecha de inicio' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY/MM/DD"
            placeholder="Selecciona la fecha de inicio"
          />
        </Form.Item>

        <Form.Item
          label="Fecha Termino"
          name="finaldate"
          rules={[{ required: true, message: 'Ingresa la fecha de termino' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY/MM/DD"
            placeholder="Selecciona la fecha de término"
          />
        </Form.Item>

        <Form.Item
          label="Hora"
          name="hour"
          rules={[{ required: true, message: 'Ingresa la hora' }]}
        >
          <Input placeholder="Ingrese la hora" />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="state"
          rules={[{ required: true, message: 'Seleccione el estado' }]}
        >
          <Select
            placeholder="Selecciona un estado"
            onChange={(value) => setSelectedState(value)}
          >
            {states.map(state => (
              <Option key={state} value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ciudad"
          name="city"
          rules={[{ required: true, message: 'Seleccione la ciudad' }]}
        >
          <Select
            placeholder="Selecciona una ciudad"
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            {selectedState && cities[selectedState].map(city => (
              <Option key={city} value={city}>{city}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Colonia"
          name="colony"
        >
          <Select
            placeholder={coloniesAvailable ? "Selecciona una colonia" : "No hay colonias disponibles"}
            disabled={!selectedCity || !coloniesAvailable}
          >
            {selectedCity && colonies[selectedCity]?.map(colony => (
              <Option key={colony} value={colony}>{colony}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message: 'Ingresa la descripción de la campaña' }]}
        >
          <TextArea placeholder="Descripción de la campaña" rows={4} />
        </Form.Item>

        <Form.Item
          label="Efectos"
          name="sideeffects"
          rules={[{ required: true, message: 'Efectos secundarios de la vacuna' }]}
        >
          <Input placeholder="Efectos" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Crear Campaña
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCampaign;
