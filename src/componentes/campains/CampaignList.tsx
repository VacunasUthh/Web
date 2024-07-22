import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, List, Button, Typography, Divider, Modal, Form, Input, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import { EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';
import moment from 'moment';

interface Campaign {
  _id: string;
  images: string;
  name: string;
  description: string;
  vaccines: string[];
  startdate: string;
  finaldate: string;
  hour: string;
  state: string;
  city: string;
  colony: string;
  sideeffects: string;
  age: string;
  assignednurse: string;
}

const { Title } = Typography;

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [images, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [vaccines, setVaccines] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [finalDate, setFinalDate] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [colony, setColony] = useState<string>('');
  const [sideeffects, setSideeffects] = useState<string>('');
  const [age, setAge] = useState<string>('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get<Campaign[]>(`${API_URL}/campaigns`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
        message.error('Error cargando las campañas');
      }
    };

    fetchCampaigns();
  }, []);

  const showModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setImage(campaign.images);
    setName(campaign.name);
    setDescription(campaign.description);
    setVaccines(campaign.vaccines.join(', ')); // Convertir array de vacunas a string con comas
    setStartDate(campaign.startdate);
    setFinalDate(campaign.finaldate);
    setHour(campaign.hour);
    setState(campaign.state);
    setCity(campaign.city);
    setColony(campaign.colony);
    setSideeffects(campaign.sideeffects);
    setAge(campaign.age);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`${API_URL}/campaigns/${_id}`);
      setCampaigns(campaigns.filter(campaign => campaign._id !== _id));
      setModalOpen(false);
      message.success('Campaña eliminada');
    } catch (error) {
      message.error('Error eliminando la campaña');
    }
  };

  const handleUpdate = async () => {
    if (selectedCampaign) {
      if (!name || !description || !vaccines || !startDate || !finalDate || !hour || !state || !city || !colony || !sideeffects || !age) {
        message.error('Por favor llena todos los campos');
        return;
      }

      try {
        const updatedCampaign: Campaign = {
          ...selectedCampaign,
          name,
          description,
          vaccines: vaccines.split(',').map(vaccine => vaccine.trim()),
          startdate: startDate,
          finaldate: finalDate,
          hour,
          state,
          city,
          colony,
          sideeffects,
          age,
        };

        await axios.put(`${API_URL}/campaigns/${selectedCampaign._id}`, updatedCampaign);
        setCampaigns(campaigns.map(campaign => campaign._id === selectedCampaign._id ? updatedCampaign : campaign));
        setModalOpen(false);
        message.success('Campaña actualizada');
      } catch (error) {
        message.error('Error actualizando la campaña');
      }
    }
  };

  const handleSendNotification = async (_id: string) => {
    try {
      await axios.post(`${API_URL}/emails/sendNotification`, { campaignId: _id });
      message.success('Notificación enviada');
    } catch (error) {
      message.error('Error enviando la notificación');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Campaña de vacunación</Title>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        <Link to="/makeCampaings">Nueva campaña</Link>
      </Button>
      <Divider style={{ margin: '20px 0' }} />
      <List
        itemLayout="horizontal"
        dataSource={campaigns}
        renderItem={(campaign) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to="#" onClick={() => showModal(campaign)}>{campaign.name}</Link>}
              description={`${campaign.description}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Detalles de la Campaña"
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
              if (selectedCampaign && selectedCampaign._id) {
                handleDelete(selectedCampaign._id);
              } else {
                message.error('Campaña seleccionada no encontrada');
              }
            }}
            icon={<DeleteOutlined />}
          >
            Eliminar
          </Button>,
          <Button
            key="notify"
            type="primary"
            onClick={() => {
              if (selectedCampaign && selectedCampaign._id) {
                Modal.confirm({
                  title: 'Confirmar Envío de Notificación',
                  content: '¿Estás seguro que deseas enviar una notificación por correo?',
                  onOk: () => handleSendNotification(selectedCampaign._id)
                });
              } else {
                message.error('Campaña seleccionada no encontrada');
              }
            }}
            icon={<MailOutlined />}
          >
            Enviar Notificación
          </Button>
        ]}
      >
        {selectedCampaign && (
          <Form layout="vertical">
            <Form.Item label="Imagen:">
              {images ? <img src={images} alt="Campaña" style={{ width: '70%' }} /> : <span>No hay imagen disponible</span>}
            </Form.Item>
            <Form.Item label="Nombre:">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Vacuna:">
              <Input value={vaccines} onChange={(e) => setVaccines(e.target.value)} />
            </Form.Item>
            <Form.Item label="Edad:">
              <Input value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Item>
            <Form.Item label="Fecha de inicio:">
              <DatePicker
                style={{ width: '100%' }}
                value={moment(startDate, 'YYYY-MM-DD')}
                format="YYYY-MM-DD"
                onChange={(date, dateString) => setStartDate(dateString)}
              />
            </Form.Item>
            <Form.Item label="Fecha de término:">
              <DatePicker
                style={{ width: '100%' }}
                value={moment(finalDate, 'YYYY-MM-DD')}
                format="YYYY-MM-DD"
                onChange={(date, dateString) => setFinalDate(dateString)}
              />
            </Form.Item>
            <Form.Item label="Horario:">
              <Input value={hour} onChange={(e) => setHour(e.target.value)} />
            </Form.Item>
            <Form.Item label="Estado:">
              <Input value={state} onChange={(e) => setState(e.target.value)} />
            </Form.Item>
            <Form.Item label="Ciudad:">
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            <Form.Item label="Colonia:">
              <Input value={colony} onChange={(e) => setColony(e.target.value)} />
            </Form.Item>
            <Form.Item label="Descripción:">
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Efectos Secundarios:">
              <Input value={sideeffects} onChange={(e) => setSideeffects(e.target.value)} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CampaignList;
