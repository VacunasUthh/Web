import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MyCalendar from './calendario'; // Importa el componente MyCalendar
import { API_URL } from "../../utils/constants";

interface Child {
    childId: string;
    childName: string;
    parentName: string;  // Agregado para mostrar el nombre del padre
}

interface Parent {
    parentId: string;
    parentName: string;
    children: Child[];
}

const CalendarList: React.FC = () => {
    const [data, setData] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null); // Estado para el childId seleccionado

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
            
            // Transformar los datos
            const transformedData: Child[] = parents.flatMap(parent => 
                parent.children.map(child => ({
                    ...child,
                    parentName: parent.parentName,  // Añadir el nombre del padre al hijo
                }))
            );
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const handleViewCalendar = (childId: string) => {
        setSelectedChildId(childId); // Establecer el childId seleccionado al hacer clic
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
                    <Button onClick={() => handleViewCalendar(record.childId)}>Ver calendario</Button>
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
                rowKey={(record) => record.childId}
                expandable={{
                    expandedRowRender: () => null, // Render vacío para deshabilitar expandir filas
                    rowExpandable: () => false, // Deshabilitar la capacidad de expandir filas
                }}
            />
            {selectedChildId && <MyCalendar childId={selectedChildId} />} {/* Renderizar MyCalendar si hay un childId seleccionado */}
        </div>
    );
};

export default CalendarList;
