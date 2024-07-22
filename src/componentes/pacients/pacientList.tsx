import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../utils/constants";

// Define los tipos
interface Child {
    childId: string;
    childName: string;
    gender: string;
    date: string;
    height: string;
    weight: string;
    vaccines: string;
    hospital: string;
}

interface Parent {
    parentId: string;
    parentName: string;
    children: Child[];
}

// Define el tipo combinado
interface CombinedChild extends Child {
    parentName: string;
    parentId: string;
}

const ParentsList: React.FC = () => {
    const [data, setData] = useState<CombinedChild[]>([]);
    const navigate = useNavigate();

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
            const transformedData: CombinedChild[] = parents.flatMap(parent => 
                parent.children.map(child => ({
                    ...child,
                    parentName: parent.parentName,
                    parentId: parent.parentId,
                }))
            );
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const handleCartillaClick = (childId: string) => {
        navigate(`/cartilla/${childId}`);
    };

    // Define las columnas con el tipo combinado
    const columns: ColumnsType<CombinedChild> = [
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
                    <Button onClick={() => handleCartillaClick(record.childId)}>
                        Cartilla
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 7 }}
            rowKey={(record) => record.childId}
        />
    );
};

export default ParentsList;
