
import React, { ReactNode } from "react";
import img from '../../image/Fondo.png';

interface BackgroundScreenProps {
    children?: ReactNode;
}

const BackgroundScreen: React.FC<BackgroundScreenProps> = ({ children }) => {
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'row',  
            alignItems: 'stretch', 
            background:  '#f0f0f0',
        }}>
            <div style={{
                flex: 1,              // Que ocupe todo el espacio restante
                position: 'relative'  // Permitir posicionar el contenido
            }}>
                {children}
            </div>
            <div style={{
                flex: 1,                      // Que ocupe la mitad derecha
                position: 'relative',         // Permitir posicionar la imagen
                overflow: 'hidden',           // Evitar que la imagen se desborde del contenedor
                display: 'flex',              // Alinear la imagen
                alignItems: 'center',         // Centrar verticalmente la imagen
                justifyContent: 'center'      // Centrar horizontalmente la imagen
            }}>
                <img 
                    src={img} 
                    alt="Fondo" 
                    style={{ 
                        minWidth: '100%',      // Asegurar que la imagen tenga al menos el ancho del contenedor
                        minHeight: '100%',     // Asegurar que la imagen tenga al menos la altura del contenedor
                        width: 'auto',         // Permitir que la imagen se ajuste de manera responsiva
                        height: 'auto',        // Permitir que la imagen se ajuste de manera responsiva
                        filter: 'blur(1px)',   // Aplicar desenfoque a la imagen
                        position: 'absolute',  // Posicionar de manera absoluta para ajustes finos
                        left: 0,
                        top: 0,
                        zIndex: 1             // Colocar detrás del contenido principal
                    }} 
                />
            </div>
        </div>
    );
};

export default BackgroundScreen;
