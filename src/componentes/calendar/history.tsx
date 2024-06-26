import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_URL } from "../../utils/constants";

interface Child {
    childId: string;
    childName: string;
    parentName: string;
    parentEmail: string;
}

interface Parent {
    parentId: string;
    parentName: string;
    parentEmail: string;
    children: Child[];
}

interface Vaccination {
    vaccineId: string;
    vaccineName: string;
    expectedVaccineDate: Date;
    delayDays?: number;
}

interface VaccinationData {
    notifications: Vaccination[];
    upcomingVaccinations: Vaccination[];
}

const ListHistorial: React.FC = () => {
    const [data, setData] = useState<Child[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [vaccinationData, setVaccinationData] = useState<VaccinationData | null>(null);

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const response = await fetch(`${API_URL}/parents/assigned?email=${localStorage.getItem('email')}`);
            if (!response.ok) {
                throw new Error('Error fetching assigned parents');
            }
            const parents: Parent[] = await response.json();

            const transformedData: Child[] = parents.flatMap(parent => 
                parent.children.map(child => ({
                    ...child,
                    parentName: parent.parentName,
                    parentEmail: parent.parentEmail,
                }))
            );
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const fetchVaccinationData = async (childId: string) => {
        try {
            const response = await fetch(`${API_URL}/parents/child/${childId}`);
            if (!response.ok) {
                throw new Error('Error fetching vaccination data');
            }
            const data = await response.json();
            setVaccinationData(data);
        } catch (error) {
            console.error('Error fetching vaccination data:', error);
        }
    };

    const showModal = (child: Child) => {
        setSelectedChild(child);
        setVaccinationData(null); // Limpiar los datos de vacunación antes de cargar nuevos datos
        fetchVaccinationData(child.childId);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedChild(null);
        setVaccinationData(null);
    };

    const showConfirm = () => {
        Modal.confirm({
            title: '¿Desea enviar la notificación por correo al padre?',
            onOk() {
                if (selectedChild && selectedChild.parentEmail) {
                    const parentEmail = selectedChild.parentEmail;
                    console.log(parentEmail);
                    if (parentEmail) {
                        fetch(`${API_URL}/emails/send-notification-email`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: parentEmail }),
                        })
                        .then(response => {
                            if (response.ok) {
                                message.success('Notificación enviada');
                            } else {
                                message.error('Error al enviar la notificación');
                            }
                        })
                        .catch(error => {
                            console.error('Error sending notification:', error);
                            message.error('Error al enviar la notificación');
                        });
                    } else {
                        message.error('No se pudo obtener el email del padre');
                    }
                } else {
                    message.error('No se ha seleccionado ningún hijo');
                }
            },
            onCancel() {
                message.info('Notificación cancelada');
            },
        });
    };

    const columns: ColumnsType<Child> = [
        {
            title: 'Nombre del Padre',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: 'Nombre del Hijo',
            dataIndex: 'childName',
            key: 'childName',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)}>Historial</Button>
                </Space>
            ),
        },
    ];

    const notificationColumns = [
        {
            title: 'Nombre de la Vacuna',
            dataIndex: 'vaccineName',
            key: 'vaccineName',
        },
        {
            title: 'Fecha Esperada',
            dataIndex: 'expectedVaccineDate',
            key: 'expectedVaccineDate',
            render: (date: Date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Días de Retraso',
            dataIndex: 'delayDays',
            key: 'delayDays',
        },
    ];

    const upcomingColumns = [
        {
            title: 'Nombre de la Vacuna',
            dataIndex: 'vaccineName',
            key: 'vaccineName',
        },
        {
            title: 'Fecha Esperada',
            dataIndex: 'expectedVaccineDate',
            key: 'expectedVaccineDate',
            render: (date: Date) => new Date(date).toLocaleDateString(),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 7 }}
                rowKey={(record) => record.childId}
                expandable={{
                    expandedRowRender: () => null,
                    rowExpandable: () => false,
                }}
            />
            {selectedChild && (
                <Modal
                    title={`Historial de Vacunación para ${selectedChild.childName}`}
                    visible={modalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p><strong>Vacunas Atrasadas:</strong></p>
                        <Button onClick={showConfirm}>Enviar Notificación</Button>
                    </div>
                    <Table
                        columns={notificationColumns}
                        dataSource={vaccinationData ? vaccinationData.notifications : []}
                        pagination={false}
                        rowKey={(record) => record.vaccineId}
                    />
                    <p><strong>Vacunas Próximas:</strong></p>
                    <Table
                        columns={upcomingColumns}
                        dataSource={vaccinationData ? vaccinationData.upcomingVaccinations : []}
                        pagination={false}
                        rowKey={(record) => record.vaccineId}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ListHistorial;
