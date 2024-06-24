import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_URL } from "../../utils/constants";

interface Child {
  childId: string;
  childName: string;
}

interface Parent {
  parentId: string;
  parentName: string;
  children: Child[];
}

interface DataType {
  key: string;
  parentName: string;
  childrenNames: string;
  childrenIds: string;
}

const ParentsTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const nurseEmail = localStorage.getItem('email'); 

  useEffect(() => {
    fetch(`${API_URL}/parents/unassigned`)
      .then(response => response.json())
      .then(parents => {
        const formattedData = parents.map((parent: Parent) => ({
          key: parent.parentId,
          parentName: parent.parentName,
          childrenNames: parent.children.map(child => child.childName).join(', '),
          childrenIds: parent.children.map(child => child.childId).join(', '),
        }));
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching parents:', error));
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nombre del Padre',
      dataIndex: 'parentName',
      key: 'parentName',
    },
    {
      title: 'Nombre(s) del Hijo(s)',
      dataIndex: 'childrenNames',
      key: 'childrenNames',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleSelect(record.key, record.childrenIds)}>Seleccionar</a>
        </Space>
      ),
    },
  ];

  const handleSelect = async (parentId: string, childrenIds: string) => {
    const nurseEmail = localStorage.getItem('email');
    console.log(parentId);
    console.log(nurseEmail);
    try {
      const response = await fetch(`${API_URL}/parents/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parentId, nurseEmail }),
      });
  
      if (response.ok) {
        alert('Asignación exitosa.');
        setData(data.filter(item => item.key !== parentId));
      } else {
        const errorData = await response.json();
        console.error('Error en la asignación:', errorData);
        alert('Error en la asignación: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error en la solicitud de asignación: ' + error);
    }
  };

  

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 7 }} 
    />
  );
};

export default ParentsTable;
