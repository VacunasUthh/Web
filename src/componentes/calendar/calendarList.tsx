import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, message, Input, Calendar, Badge } from 'antd';
import { API_URL } from "../../utils/constants";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import locale from 'antd/es/calendar/locale/es_ES';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const { TextArea } = Input;

interface Child {
    childId: string;
    childName: string;
    parentName: string;
    parentEmail: string;
    childBirthDate: string;
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

interface ReportData {
    notifications: Vaccination[];
    upcomingVaccinations: Vaccination[];
    parentName: string;
    childName: string;
    childBirthDate: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 10,
    },
    subtitle1: {
        fontSize: 15,
        marginBottom: 10,
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    tableHeader: {
        fontSize: 15,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableCellHeader: {
        fontSize: 10,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 12,
    },
});

const CalendarList: React.FC = () => {
    const [data, setData] = useState<Child[]>([]);
    const [selectedChild, setSelectedChild] = useState<string | null>(null);
    const [selectedChildHistory, setSelectedChildHistory] = useState<Child | null>(null);
    const [vaccinationDates, setVaccinationDates] = useState<VaccinationData>({ notifications: [], upcomingVaccinations: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [historyModalVisible, setHistoryModalVisible] = useState(false);
    const [vaccinationData, setVaccinationData] = useState<VaccinationData | null>(null);
    const [observationModalVisible, setObservationModalVisible] = useState(false);
    const [observation, setObservation] = useState('');

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

    const handleViewCalendar = async (childId: string) => {
        setSelectedChild(childId);
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/parents/child/${childId}`);
            if (!response.ok) {
                throw new Error('Error fetching vaccination data');
            }
            const vaccinationData = await response.json();
            setVaccinationDates(vaccinationData);
        } catch (error) {
            console.error('Error fetching vaccination data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewReport = async (childId: string, childName: string, childBirthDate: string) => {
        try {
            const response = await fetch(`${API_URL}/parents/child/${childId}`);
            if (!response.ok) {
                throw new Error('Error fetching vaccination data');
            }
            const data = await response.json();
            const reportData: ReportData = {
                notifications: data.notifications,
                upcomingVaccinations: data.upcomingVaccinations,
                parentName: data.parentName,
                childName: childName,
                childBirthDate: data.childBirthDate,
            };

            // Crear el documento PDF
            const pdfDoc = (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <Text style={styles.title}>Reporte de Vacunación</Text>
                        <Text style={styles.subtitle}>Nombre del Niño: {reportData.childName}</Text>
                        <Text style={styles.subtitle}>Fecha de Nacimiento: {reportData.childBirthDate}</Text>
                        <Text style={styles.subtitle}>Nombre del Padre: {reportData.parentName}</Text>

                        <Text style={styles.subtitle1}>Vacunas Retrasadas:</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableCellHeader}>Nombre de la Vacuna</Text>
                                <Text style={styles.tableCellHeader}>Fecha Esperada</Text>
                                <Text style={styles.tableCellHeader}>Días de Retraso</Text>
                            </View>
                            {reportData.notifications.map(notification => (
                                <View style={styles.tableRow} key={notification.vaccineId}>
                                    <Text style={styles.tableCell}>{notification.vaccineName}</Text>
                                    <Text style={styles.tableCell}>{new Date(notification.expectedVaccineDate).toLocaleDateString()}</Text>
                                    <Text style={styles.tableCell}>{notification.delayDays || 'N/A'}</Text>
                                </View>
                            ))}
                        </View>

                        <Text style={styles.subtitle1}>Próximas Vacunaciones:</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableCellHeader}>Nombre de la Vacuna</Text>
                                <Text style={styles.tableCellHeader}>Fecha Esperada</Text>
                            </View>
                            {reportData.upcomingVaccinations.map(vaccination => (
                                <View style={styles.tableRow} key={vaccination.vaccineId}>
                                    <Text style={styles.tableCell}>{vaccination.vaccineName}</Text>
                                    <Text style={styles.tableCell}>{new Date(vaccination.expectedVaccineDate).toLocaleDateString()}</Text>
                                </View>
                            ))}
                        </View>
                    </Page>
                </Document>
            );

            // Descargar el PDF
            const pdfBlob = await pdf(pdfDoc).toBlob();
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `reporte-vacunacion-${childName}.pdf`;
            link.click();
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error fetching vaccination data for report:', error);
            message.error('Error al generar el reporte');
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
        setSelectedChildHistory(child);
        setVaccinationData(null); // Limpiar los datos de vacunación antes de cargar nuevos datos
        fetchVaccinationData(child.childId);
        setHistoryModalVisible(true); // Mostrar el modal de historial
    };

    const handleCancel = () => {
        setHistoryModalVisible(false); // Ocultar el modal de historial
        setSelectedChildHistory(null); // Limpiar el niño seleccionado para historial
        setVaccinationData(null); // Limpiar los datos de vacunación
    };

    const handleSendNotification = () => {
        Modal.confirm({
            title: '¿Desea agregar una observación?',
            onOk: () => {
                showObservationModal();
            },
            onCancel: () => {
                handleSendEmail('');
            },
            okText: 'Sí',
            cancelText: 'No'
        });
    };

    const showObservationModal = () => {
        setObservationModalVisible(true);
    };

    const handleSendEmail = async (observation: string) => {
        if (!selectedChildHistory) return;

        const requestBody = {
            parentEmail: selectedChildHistory.parentEmail,
            observation: observation,
        };

        try {
            const response = await fetch(`${API_URL}/emails/send-notification-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                message.success('Notificación enviada correctamente');
            } else {
                message.error('Error al enviar la notificación');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            message.error('Error al enviar la notificación');
        }

        setObservationModalVisible(false); // Cerrar el modal de observación
    };

    const handleObservationOk = () => {
        handleSendEmail(observation);
    };

    const handleObservationCancel = () => {
        setObservationModalVisible(false);
        setObservation('');
    };

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

    const columns = [
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
            render: (_: any, record: Child) => (
                <Space size="middle">
                    <Button onClick={() => handleViewCalendar(record.childId)}>Ver calendario</Button>
                    <Button onClick={() => showModal(record)}>Historial</Button>
                    <Button onClick={() => handleViewReport(record.childId, record.childName, record.childBirthDate)}>Reporte</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 7 }}
                rowKey={(record: Child) => record.childId}
                expandable={{
                    expandedRowRender: () => null,
                    rowExpandable: () => false,
                }}
            />
            {selectedChildHistory && (
                <Modal
                    title={`Historial de Vacunación de ${selectedChildHistory.childName}`}
                    visible={historyModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Button style={{ marginRight: '10px' }} onClick={handleSendNotification} type="primary">
                        Enviar Notificación
                    </Button>
                    <Button onClick={handleCancel}>
                        Cerrar
                    </Button>
                    <Table
                        columns={notificationColumns}
                        dataSource={vaccinationData?.notifications}
                        rowKey={(record: Vaccination) => record.vaccineId}
                        pagination={false}
                    />
                    <h3>Próximas Vacunaciones:</h3>
                    <Table
                        columns={upcomingColumns}
                        dataSource={vaccinationData?.upcomingVaccinations}
                        rowKey={(record: Vaccination) => record.vaccineId}
                        pagination={false}
                    />
                </Modal>
            )}
            {selectedChild && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Calendario de Vacunación</h2>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <Calendar
                            locale={locale}
                            dateCellRender={(value) => {
                                const formattedValue = value.format('YYYY-MM-DD');
                                const notifications = vaccinationDates.notifications.filter((notification: any) => dayjs(notification.expectedVaccineDate).format('YYYY-MM-DD') === formattedValue);
                                const upcomingVaccinations = vaccinationDates.upcomingVaccinations.filter((vaccination: any) => dayjs(vaccination.expectedVaccineDate).format('YYYY-MM-DD') === formattedValue);

                                return (
                                    <ul className="events">
                                        {notifications.length > 0 && (
                                            <li>
                                                <Badge status="error" text={`Retrasado:`} />
                                                {notifications.map((notification: any) => (
                                                    <span key={notification.vaccineId}>
                                                        {notification.vaccineName}
                                                        <br />
                                                    </span>
                                                ))}
                                            </li>
                                        )}
                                        {upcomingVaccinations.length > 0 && (
                                            <li>
                                                <Badge status="success" text={`Próximo:`} />
                                                {upcomingVaccinations.map((vaccination: any) => (
                                                    <span key={vaccination.vaccineId}>
                                                        {vaccination.vaccineName}
                                                        <br />
                                                    </span>
                                                ))}
                                            </li>
                                        )}
                                    </ul>
                                );
                            }}
                        />
                    )}
                </div>
            )}
            <Modal
                title="Agregar Observación"
                visible={observationModalVisible}
                onOk={handleObservationOk}
                onCancel={handleObservationCancel}
            >
                <TextArea
                    rows={4}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Ingrese una observación para la notificación"
                />
            </Modal>
        </div>
    );
};

export default CalendarList;
