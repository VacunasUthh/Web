import React from 'react';
import '../../styles/tabs.css';
interface TabsProps {
    selectedIndex: number;
    setIndex: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedIndex, setIndex }) => {
    return (
        <div className="tabs">
            <button
                className={`tab-button ${selectedIndex === 0 ? 'active' : ''}`}
                onClick={() => setIndex(0)}
            >
                Datos Personales
            </button>
            <button
                className={`tab-button ${selectedIndex === 1 ? 'active' : ''}`}
                onClick={() => setIndex(1)}
            >
                Domicilio
            </button>
            <button
                className={`tab-button ${selectedIndex === 2 ? 'active' : ''}`}
                onClick={() => setIndex(2)}
            >
                Contacto
            </button>
        </div>
    );
};

export default Tabs;