import React from 'react';
import { Table } from 'antd';
import '../../styles/cartilla.css';

const VaccinationSchedule: React.FC = () => {
  const columns = [
    {
      title: 'VACUNA',
      dataIndex: 'vaccine',
      key: 'vaccine',
      width: 150,
    },
    {
      title: 'ENFERMEDAD QUE PREVIENE',
      dataIndex: 'diseasePrevented',
      key: 'diseasePrevented',
      width: 250,
    },
    {
      title: 'DOSIS',
      dataIndex: 'dose',
      key: 'dose',
      width: 100,
    },
    {
      title: 'EDAD Y FRECUENCIA',
      dataIndex: 'ageAndFrequency',
      key: 'ageAndFrequency',
      width: 200,
    },
    {
      title: 'FECHA DE VACUNACIÓN',
      dataIndex: 'vaccinationDate',
      key: 'vaccinationDate',
      width: 200,
    },
  ];

  const data = [
    {
      key: '1',
      vaccine: 'B C G',
      diseasePrevented: 'TUBERCULOSIS',
      dose: 'ÚNICA',
      ageAndFrequency: 'AL NACER',
      vaccinationDate: '',
    },
    {
      key: '2',
      vaccine: 'HEPATITIS B',
      diseasePrevented: 'HEPATITIS B',
      dose: 'PRIMERA',
      ageAndFrequency: 'AL NACER',
      vaccinationDate: '',
    },
    {
      key: '3',
      vaccine: 'HEPATITIS B',
      diseasePrevented: 'HEPATITIS B',
      dose: 'SEGUNDA',
      ageAndFrequency: '2 MESES',
      vaccinationDate: '',
    },
    {
      key: '4',
      vaccine: 'HEPATITIS B',
      diseasePrevented: 'HEPATITIS B',
      dose: 'TERCERA',
      ageAndFrequency: '6 MESES',
      vaccinationDate: '',
    },
    {
      key: '5',
      vaccine: 'PENTAVALENTE ACELULAR DPaT + VPI + Hib',
      diseasePrevented: 'DIFTERIA, TOS FERINA, TÉTANOS, POLIOMIELITIS E INFECCIONES POR H. influenzae b',
      dose: 'PRIMERA',
      ageAndFrequency: '2 MESES',
      vaccinationDate: '',
    },
    {
      key: '6',
      vaccine: 'PENTAVALENTE ACELULAR DPaT + VPI + Hib',
      diseasePrevented: 'DIFTERIA, TOS FERINA, TÉTANOS, POLIOMIELITIS E INFECCIONES POR H. influenzae b',
      dose: 'SEGUNDA',
      ageAndFrequency: '4 MESES',
      vaccinationDate: '',
    },
    {
      key: '7',
      vaccine: 'PENTAVALENTE ACELULAR DPaT + VPI + Hib',
      diseasePrevented: 'DIFTERIA, TOS FERINA, TÉTANOS, POLIOMIELITIS E INFECCIONES POR H. influenzae b',
      dose: 'TERCERA',
      ageAndFrequency: '6 MESES',
      vaccinationDate: '',
    },
    {
      key: '8',
      vaccine: 'PENTAVALENTE ACELULAR DPaT + VPI + Hib',
      diseasePrevented: 'DIFTERIA, TOS FERINA, TÉTANOS, POLIOMIELITIS E INFECCIONES POR H. influenzae b',
      dose: 'CUARTA',
      ageAndFrequency: '18 MESES',
      vaccinationDate: '',
    },
    {
      key: '9',
      vaccine: 'DPT',
      diseasePrevented: 'DIFTERIA, TOS FERINA Y TÉTANOS',
      dose: 'REFUERZO',
      ageAndFrequency: '4 AÑOS',
      vaccinationDate: '',
    },
    {
      key: '10',
      vaccine: 'ROTAVIRUS',
      diseasePrevented: 'DIARREA POR ROTAVIRUS',
      dose: 'PRIMERA',
      ageAndFrequency: '2 MESES',
      vaccinationDate: '',
    },
    {
      key: '11',
      vaccine: 'ROTAVIRUS',
      diseasePrevented: 'DIARREA POR ROTAVIRUS',
      dose: 'SEGUNDA',
      ageAndFrequency: '4 MESES',
      vaccinationDate: '',
    },
    {
      key: '12',
      vaccine: 'ROTAVIRUS',
      diseasePrevented: 'DIARREA POR ROTAVIRUS',
      dose: 'TERCERA',
      ageAndFrequency: '6 MESES',
      vaccinationDate: '',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      title={() => 'ESQUEMA DE VACUNACIÓN'}
      className="custom-table"
    />
  );
};

export default VaccinationSchedule;
