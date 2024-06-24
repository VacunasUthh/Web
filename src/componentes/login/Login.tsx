import React, { useState } from 'react';
import TabLogin from './TabLogin';
import TabRegister from './TabRegister';

import BackgroundScreen from './BackgroundScreen';
import { styles } from '../../styles/login.style'; // Importa los estilos

const Login: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'login' | 'register'>('login');

    return (
        <BackgroundScreen>
            {/* Contenedor principal */}
            <div style={{ ...styles.containerTabs, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {/* Título de la empresa */}
                <h1 style={{ fontFamily: "'Roboto Slab', serif", fontSize: '39px', color: '#333', marginBottom: '20px' }}>
                    Sistema Vacunas
                </h1>
                {/* Contenedor para la pestaña */}
                <div style={{
                    background: 'linear-gradient(to bottom right, #3193e4e3,#FFF)', // Degradado de azul claro a azul medio que combina con un fondo de figuras hospitalarias azules
                    width: '100%', // Ajusta el ancho del contenedor de las pestañas
                    maxWidth: '600px', // Máximo ancho para mantener la legibilidad y el diseño responsivo
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px', // Incrementa el padding para mayor espacio interno
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}>
                    {/* Componente de pestañas */}
                    <div className="tab-header" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <button
                            onClick={() => setSelectedTab('login')}
                            className={`tab-button ${selectedTab === 'login' ? 'active' : ''}`}
                            style={{
                                padding: '10px 80px', // Aumenta el padding para hacer los botones más grandes
                                cursor: 'pointer',
                                backgroundColor: selectedTab === 'login' ? '#003268c7' : '#FFF',
                                color: selectedTab === 'login' ? '#FFF' : '#003268c7',
                                border: 'none',
                                outline: 'none',
                                fontWeight: 'bold',
                                borderRadius: '5px 0 0 5px',
                                fontSize: '16px', // Ajusta el tamaño del texto
                            }}
                        >
                            Inicio Sesión
                        </button>
                        <button
                            onClick={() => setSelectedTab('register')}
                            className={`tab-button ${selectedTab === 'register' ? 'active' : ''}`}
                            style={{
                                padding: '10px 80px', // Aumenta el padding para hacer los botones más grandes
                                cursor: 'pointer',
                                backgroundColor: selectedTab === 'register' ? '#003268c7' : '#FFF',
                                color: selectedTab === 'register' ? '#FFF' : '#003268c7',
                                border: 'none',
                                outline: 'none',
                                fontWeight: 'bold',
                                borderRadius: '0 5px 5px 0',
                                fontSize: '16px', // Ajusta el tamaño del texto
                            }}
                        >
                            Registro
                        </button>
                    </div>
                    {/* Contenido dinámico según la pestaña seleccionada */}
                    {selectedTab === 'login' ? <TabLogin /> : <TabRegister />}
                </div>
            </div>
        </BackgroundScreen>
    );
};

export default Login;
