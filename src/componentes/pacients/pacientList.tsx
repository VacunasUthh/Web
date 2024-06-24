import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_URL } from "../../utils/constants";

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

const ParentsList: React.FC = () => {
    const [data, setData] = useState<Parent[]>([]);
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const response = await fetch(`${API_URL}/parents/assigned?email=${localStorage.getItem('email')}`);
            if (!response.ok) {
                throw new Error('Error fetching assigned parents');
            }
            console.log(localStorage.getItem('email'))
            const parents = await response.json();
            setData(parents);
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const fetchParentDetails = async (parentId: string) => {
        try {
            const response = await fetch(`${API_URL}/parents/details/${parentId}`);
            if (!response.ok) {
                throw new Error('Error fetching parent details');
            }
            const parentDetails = await response.json();
            setSelectedParent(parentDetails);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching parent details:', error);
        }
    };

    const columns: ColumnsType<Parent> = [
        {
            title: 'Nombre del Padre',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: 'Nombre(s) del Hijo(s)',
            dataIndex: 'children',
            key: 'children',
            render: (children: Child[]) => children.map(child => child.childName).join(', '),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => fetchParentDetails(record.parentId)}>Detalles</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 7 }}
                rowKey={(record) => record.parentId}
                expandable={{
                    expandedRowRender: () => null,
                    rowExpandable: () => false,
                }}
            />
            {selectedParent && (
                <Modal
                    title={`Hijo(s) de ${selectedParent.parentName}`}
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setModalVisible(false)}>
                            Cerrar
                        </Button>,
                    ]}
                >
                    {selectedParent.children.map(child => (
                        <div key={child.childId} style={{ marginBottom: '20px' }}>
                            <h3>hijo(a): {child.childName}</h3>
                            <p><strong>Género:</strong> {child.gender}</p>
                            <p><strong>Fecha de nacimiento:</strong> {child.date}</p>
                            <p><strong>Altura:</strong> {child.height}</p>
                            <p><strong>Peso:</strong> {child.weight}</p>
                            <p><strong>Vacunas:</strong> {child.vaccines}</p>
                            <p><strong>Hospital:</strong> {child.hospital}</p>
                        </div>
                    ))}
                </Modal>
            )}
        </>
    );
};

export default ParentsList;
