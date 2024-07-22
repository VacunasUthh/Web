import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import '../../styles/cartilla.css';

interface Vaccination {
  vaccineId: string;
  vaccineName: string;
  expectedVaccineDate: string;
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
  applicationDate: Date;
  dateToShow: Date;
  type?: string;
  dose?: number;
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

  const calculateDoses = (vaccinations: Vaccination[]) => {
    const groupedVaccines = vaccinations.reduce((acc: { [key: string]: Vaccination[] }, vaccine) => {
      if (!acc[vaccine.vaccineName]) {
        acc[vaccine.vaccineName] = [];
      }
      acc[vaccine.vaccineName].push(vaccine);
      return acc;
    }, {});
    return Object.entries(groupedVaccines).flatMap(([vaccineName, vaccines]) => {
      const sortedVaccines = vaccines
        .sort((a, b) => new Date(a.expectedVaccineDate).getTime() - new Date(b.expectedVaccineDate).getTime());
      return sortedVaccines.map((vaccine, index) => ({
        ...vaccine,
        dose: index + 1,
      }));
    });
  };

  const combineAndSortVaccinations = (notifications: Vaccination[], upcomingVaccinations: Vaccination[], appliedVaccinations: Vaccination[]) => {
    const combined = [
      ...appliedVaccinations.map(vaccine => ({
        ...vaccine,
        type: 'Aplicada'
      })),
      ...notifications.map(notification => ({
        ...notification,
        type: 'Atrasada'
      })),
      ...upcomingVaccinations.map(vaccine => ({
        ...vaccine,
        type: 'Próxima'
      }))
    ];

    const calculatedDoses = calculateDoses(combined);
    const sortedVaccinations = calculatedDoses
      .map(vaccine => ({
        key: vaccine.vaccineId,
        vaccineName: vaccine.vaccineName,
        expectedVaccineDate: new Date(vaccine.expectedVaccineDate),
        applicationDate: new Date(vaccine.applicationDate),
        dateToShow: vaccine.applicationDate ? new Date(vaccine.applicationDate) : new Date(vaccine.expectedVaccineDate),
        type: vaccine.type,
        dose: vaccine.dose,
        disease: vaccine.disease ? vaccine.disease.join(', ') : 'N/A',
        contraindications: vaccine.contraindications?.join(', '),
        rowSpan: vaccine.rowSpan,
        month: vaccine.month
      }))
      .sort((a, b) => {
        if (a.vaccineName === b.vaccineName) {
          return a.expectedVaccineDate.getTime() - b.expectedVaccineDate.getTime();
        }
        return a.vaccineName.localeCompare(b.vaccineName);
      });

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
      title: 'DÓSIS',
      dataIndex: 'dose',
      key: 'dose',
      width: 100,
      render: (dose: number) => `Dosis ${dose}`,
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
            'date-próxima'
          }
        >
          {date.toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'Aplicar',
      key: 'apply',
      render: (text: string, record: VaccinationTableData) => (
        (record.type === 'Próxima' || record.type === 'Atrasada') ? (
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

  const data = childData ? combineAndSortVaccinations(childData.notifications, childData.upcomingVaccinations, childData.appliedVaccinations) : [];

  return (
    <div>
      {childData ? (
        <>
          <h2>{childData.childName}</h2>
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
