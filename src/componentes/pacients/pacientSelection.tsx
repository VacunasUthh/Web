import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

  useEffect(() => {
    fetch('https://vaccinationapi.vercel.app/parents')
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

  const handleSelect = (parentId: string, childrenIds: string) => {
    console.log('Selected Parent ID:', parentId);
    console.log('Selected Children IDs:', childrenIds);
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
