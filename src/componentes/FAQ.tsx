import React, { useState } from 'react';
import { Collapse, Card } from 'antd';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/faq.css';

const { Panel } = Collapse;

const faqs = [
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
    { question: "¿Cómo se pueden generar reportes y estadísticas a partir de la información almacenada en la cartilla digital utilizando la aplicación?", answer: "La aplicación ofrece herramientas para generar reportes detallados y estadísticas sobre el estado de salud de los pacientes, el cumplimiento de tratamiento" },
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1>Preguntas frecuentes</h1>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <Card
                        key={index}
                        className="faq-item"
                        style={{ marginBottom: '16px', backgroundColor: '#e6f7ff' }}
                    >
                        <Collapse
                            activeKey={openIndex === index ? `${index}` : ''}
                            onChange={() => toggleFAQ(index)}
                            expandIcon={({ isActive }) => isActive ? <FaMinus /> : <FaPlus />}
                        >
                            <Panel header={faq.question} key={`${index}`}>
                                <p>{faq.answer}</p>
                            </Panel>
                        </Collapse>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
