import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import '../../styles/cartilla.css';

interface Vaccination {
  vaccineId: string;
  vaccineName: string;
  expectedVaccineDate: string;
  confirmationDate: string;
  applicationDate: string;
  delayDays?: number;
  type?: string;
  dose?: number;
  disease?: string[];
  contraindications?: string[];
  rowSpan?: number;
  month: number;
}

interface VaccinationTableData {
  key: string;
  vaccineName: string;
  expectedVaccineDate: Date;
  confirmationDate?: Date;
  applicationDate: Date | null;
  dateToShow: Date;
  type?: string;
  dose?: string;
  disease?: string;
  contraindications?: string;
  rowSpan?: number;
  month: number;
}

const VaccinationSchedule: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const [childData, setChildData] = useState<any>(null);

  const fetchChildData = async () => {
    try {
      const response = await fetch(`${API_URL}/parents/cartilla/${childId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del niño');
      }
      const data = await response.json();
      setChildData(data);
      console.log(data)
    } catch (error) {
      console.error('Error al obtener los detalles del niño:', error);
    }
  };

  useEffect(() => {
    fetchChildData();
  }, [childId]);

  const applyVaccine = async (vaccineId: string, month: number) => {
    try {
      const response = await fetch(`${API_URL}/parents/apply-vaccine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ childId, month, vaccineId })
      });

      if (!response.ok) {
        throw new Error('Error al aplicar la vacuna');
      }

      const result = await response.json();
      message.success(result.message);
      window.location.reload();
    } catch (error) {
      console.error('Error al aplicar la vacuna:', error);
      message.error('Error al aplicar la vacuna');
    }
  };

  const combineAndSortVaccinations = (
    notifications: Vaccination[], 
    upcomingVaccinations: Vaccination[], 
    appliedVaccinations: Vaccination[], 
    confirmedVaccinations: Vaccination[]
  ) => {
    // Crear un mapa de vacunas confirmadas por key y fecha
    const confirmedMap = new Map<string, Vaccination>();
    confirmedVaccinations.forEach(vaccine => {
      const key = `${vaccine.vaccineId}-${vaccine.confirmationDate}`;
      if (!confirmedMap.has(key)) {
        confirmedMap.set(key, vaccine);
      }
    });
  
    // Filtrar las vacunas confirmadas que también están en aplicadas
    const appliedSet = new Set(
      appliedVaccinations.map(vaccine => `${vaccine.vaccineId}-${vaccine.applicationDate}`)
    );
  
    // Filtrar las vacunas próximas y atrasadas eliminando las que coinciden con las confirmadas y aplicadas
    const filteredNotifications = notifications.filter(
      vaccine => !confirmedMap.has(`${vaccine.vaccineId}-${vaccine.expectedVaccineDate}`)
    );
    const filteredUpcomingVaccinations = upcomingVaccinations.filter(
      vaccine => !confirmedMap.has(`${vaccine.vaccineId}-${vaccine.expectedVaccineDate}`)
    );
    const filteredAppliedVaccinations = appliedVaccinations.filter(
      vaccine => !confirmedMap.has(`${vaccine.vaccineId}-${vaccine.expectedVaccineDate}`)
    );
  
    // Filtrar las confirmadas eliminando las que ya han sido aplicadas
    const filteredConfirmedVaccinations = Array.from(confirmedMap.values()).filter(
      vaccine => !appliedSet.has(`${vaccine.vaccineId}-${vaccine.confirmationDate}`)
    );
  
    // Combinar todas las vacunas
    const combined = [
      ...filteredAppliedVaccinations.map(vaccine => ({
        ...vaccine,
        type: 'Aplicada'
      })),
      ...filteredNotifications.map(notification => ({
        ...notification,
        type: 'Atrasada'
      })),
      ...filteredUpcomingVaccinations.map(vaccine => ({
        ...vaccine,
        type: 'Próxima'
      })),
      ...filteredConfirmedVaccinations.map(vaccine => ({
        ...vaccine,
        type: 'Confirmada'
      }))
    ];
  
    // Ordenar las vacunas combinadas
    const sortedVaccinations = combined
      .map(vaccine => ({
        key: vaccine.vaccineId,
        vaccineName: vaccine.vaccineName,
        expectedVaccineDate: new Date(vaccine.expectedVaccineDate),
        applicationDate: vaccine.applicationDate ? new Date(vaccine.applicationDate) : null,
        dateToShow: vaccine.confirmationDate 
          ? new Date(vaccine.confirmationDate) 
          : (vaccine.applicationDate 
            ? new Date(vaccine.applicationDate) 
            : new Date(vaccine.expectedVaccineDate)),
        type: vaccine.type,
        dose: `Mes ${vaccine.month}`,  // Mostrar mes aquí
        disease: vaccine.disease ? vaccine.disease.join(', ') : 'N/A',
        contraindications: vaccine.contraindications?.join(', '),
        rowSpan: vaccine.rowSpan,
        month: vaccine.month
      }))
      .sort((a, b) => {
        if (a.vaccineName === b.vaccineName) {
          return a.dateToShow.getTime() - b.dateToShow.getTime();
        }
        return a.vaccineName.localeCompare(b.vaccineName);
      });      
    // Configurar rowSpan
    let lastVaccineName = '';
    let rowSpan = 0;
    for (let i = 0; i < sortedVaccinations.length; i++) {
      if (sortedVaccinations[i].vaccineName !== lastVaccineName) {
        rowSpan = sortedVaccinations.filter(v => v.vaccineName === sortedVaccinations[i].vaccineName).length;
        sortedVaccinations[i].rowSpan = rowSpan;
        lastVaccineName = sortedVaccinations[i].vaccineName;
      } else {
        sortedVaccinations[i].rowSpan = 0;
      }
    }
    console.log(sortedVaccinations)
    return sortedVaccinations;
  };
  
  
  
  

  const getVaccineColor = (vaccineName: string) => {
    switch (vaccineName) {
      case 'BCG':
        return '#0000FF'; // Blue
      case 'DPT':
        return '#FFFF00'; // Yellow
      case 'Hepatitis B':
        return '#FFA500'; // Orange
      case 'Hexavalente':
        return '#ADD8E6'; // Light Blue
      case 'Influenza':
        return '#FFC0CB'; // Pink
      case 'Neumococo':
        return '#5C8BDD'; // Blue-Gray
      case 'Rotavirus':
        return '#66DEAD'; // Teal
      case 'SRP':
        return '#BF70C7'; // Purple
      default:
        return '#FFFFFF'; // White
    }
  };

  const columns = [
    {
      title: 'VACUNA',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
      width: 150,
      render: (text: string, record: VaccinationTableData) => ({
        children: text,
        props: {
          style: {
            backgroundColor: getVaccineColor(text),
            color: '#000000',
          },
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: 'ENFERMEDAD QUE PREVIENE',
      dataIndex: 'disease',
      key: 'disease',
      width: 200,
      render: (text: string, record: VaccinationTableData) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: 'CONTRAINDICACIONES',
      dataIndex: 'contraindications',
      key: 'contraindications',
      width: 300,
      render: (text: string, record: VaccinationTableData) => ({
        children: text || 'N/A',
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: 'MES',
      dataIndex: 'dose',
      key: 'dose',
      width: 100,
      render: (dose: string) => dose,
    },
    {
      title: 'FECHA DE VACUNACIÓN',
      dataIndex: 'dateToShow',
      key: 'dateToShow',
      width: 200,
      render: (date: Date, record: VaccinationTableData) => (
        <div
          className={
            record.type === 'Aplicada' ? 'date-aplicada' : 
            record.type === 'Atrasada' ? 'date-atrasada' : 
            record.type === 'Confirmada' ? 'date-confirmacion' : 
            'date-próxima'
          }
        >
          {date.toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'ACCIONES',
      key: 'apply',
      render: (text: string, record: VaccinationTableData) => (
        (record.type === 'Próxima' || record.type === 'Atrasada' || record.type === 'Confirmada') ? (
          <Button 
            type="primary" 
            onClick={() => applyVaccine(record.key, record.month)}
          >
            Aplicar
          </Button>
        ) : null
      ),
    },
  ];

  const data = childData ? combineAndSortVaccinations(childData.notifications, childData.upcomingVaccinations, childData.appliedVaccinations, childData.confirmedVaccinations) : [];

  return (
    <div>
      {childData ? (
        <>
          <h2>{childData.childName}</h2>
          <div className="indicator-container">
            <div className="indicator indicator-red"></div>
            <div className="indicator-label">Retrasada</div>
            <div className="indicator indicator-green"></div>
            <div className="indicator-label">Aplicada</div>
            <div className="indicator indicator-orange"></div>
            <div className="indicator-label">Confirmada</div>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="key"
            bordered
            className="custom-table" // Aplicar la clase CSS personalizada
          />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default VaccinationSchedule;
