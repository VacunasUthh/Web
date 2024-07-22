import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, List, Button, Typography, Divider, Modal, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Vaccine {
  _id: string;
  images: string;
  name: string;
  description: string;
  disease: string[];
  town: string[];
  contraindications: string[];
  area: string[];
  gravity: string;
}

const { Title } = Typography;
const { Option } = Select;

const VaccineList: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
  const [images, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [disease, setDisease] = useState<string[]>([]);
  const [town, setTown] = useState<string[]>([]);
  const [contraindications, setContraindications] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);
  const [gravity, setGravity] = useState<string>('');

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get<Vaccine[]>(`${API_URL}/vaccines`);
        setVaccines(response.data);
      } catch (error) {
        console.error('Error loading vaccines:', error);
        message.error('Error cargando las vacunas');
      }
    };

    fetchVaccines();
  }, []);

  const showModal = (vaccine: Vaccine) => {
    setSelectedVaccine(vaccine);
    setImage(vaccine.images);
    setName(vaccine.name);
    setDescription(vaccine.description);
    setDisease(vaccine.disease);
    setTown(vaccine.town);
    setContraindications(vaccine.contraindications);
    setArea(vaccine.area);
    setGravity(vaccine.gravity);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`${API_URL}/vaccines/${_id}`);
      setVaccines(vaccines.filter(vaccine => vaccine._id !== _id));
      setModalOpen(false);
      message.success('Vacuna eliminada');
    } catch (error) {
      message.error('Error eliminando la vacuna');
    }
  };

  const handleUpdate = async () => {
    if (selectedVaccine) {
      if (!name || !description || disease.length === 0 || town.length === 0 || contraindications.length === 0 || area.length === 0 || !gravity) {
        message.error('Por favor llena todos los campos');
        return;
      }

      try {
        const updatedVaccine: Vaccine = {
          ...selectedVaccine,
          name,
          description,
          disease,
          town,
          contraindications,
          area,
          gravity,
        };

        await axios.put(`${API_URL}/vaccines/${selectedVaccine._id}`, updatedVaccine);
        setVaccines(vaccines.map(vaccine => vaccine._id === selectedVaccine._id ? updatedVaccine : vaccine));
        setModalOpen(false);
        message.success('Vacuna actualizada');
      } catch (error) {
        message.error('Error actualizando la vacuna');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Creación de vacuna</Title>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        <Link to="/makeVaccines">Nueva Vacuna</Link>
      </Button>
      <Divider style={{ margin: '20px 0' }} />
      <List
        itemLayout="horizontal"
        dataSource={vaccines}
        renderItem={(vaccine) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to="#" onClick={() => showModal(vaccine)}>{vaccine.name}</Link>}
              description={`${vaccine.description}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Detalles de la Vacuna"
        visible={modalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>Salir</Button>,
          <Button
            key="update"
            type="primary"
            onClick={handleUpdate}
            icon={<EditOutlined />}
          >
            Editar
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => {
              if (selectedVaccine && selectedVaccine._id) {
                handleDelete(selectedVaccine._id);
              } else {
                message.error('Vacuna seleccionada no encontrada');
              }
            }}
            icon={<DeleteOutlined />}
          >
            Eliminar
          </Button>,
        ]}
      >
        {selectedVaccine && (
          <Form layout="vertical">
            <Form.Item label="Imagen:">
              {images ? <img src={images} alt="Vacuna" style={{ width: '70%' }} /> : <span>No hay imagen disponible</span>}
            </Form.Item>
            <Form.Item label="Nombre:">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Descripción:">
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Enfermedad:">
              <Select
                mode="tags"
                value={disease}
                onChange={(value) => setDisease(value as string[])}
                placeholder="Ingresa enfermedades separadas por comas"
              />
            </Form.Item>
            <Form.Item label="Población:">
              <Select
                mode="multiple"
                value={town}
                onChange={(value) => setTown(value as string[])}
                placeholder="Selecciona la población"
              >
                <Option value="Niños">Niños</Option>
                <Option value="Adolescentes">Adolescentes</Option>
                <Option value="Adultos">Adultos</Option>
                <Option value="Adultos Mayores">Adultos Mayores</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Advertencias:">
              <Select
                mode="tags"
                value={contraindications}
                onChange={(value) => setContraindications(value as string[])}
                placeholder="Ingresa advertencias separadas por comas"
              />
            </Form.Item>
            <Form.Item label="Área de aplicación:">
              <Select
                mode="multiple"
                value={area}
                onChange={(value) => setArea(value as string[])}
                placeholder="Selecciona el área de aplicación"
              >
                <Option value="Brazo derecho">Brazo derecho</Option>
                <Option value="Brazo izquierdo">Brazo izquierdo</Option>
                <Option value="Pierna derecha">Pierna derecha</Option>
                <Option value="Pierna izquierda">Pierna izquierda</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Gravedad:">
              <Select
                value={gravity}
                onChange={(value) => setGravity(value)}
                placeholder="Selecciona la gravedad"
              >
                <Option value="Baja">Baja</Option>
                <Option value="Regular">Regular</Option>
                <Option value="Alta">Alta</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default VaccineList;
