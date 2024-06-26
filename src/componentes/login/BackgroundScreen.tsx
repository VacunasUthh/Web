import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import backgroundImg from '../../image/Fondo.png';

interface BackgroundScreenProps {
  children: ReactNode;
}

const BackgroundScreen: React.FC<BackgroundScreenProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBEFED',
        overflow: 'hidden',
      }}
    >
      <img
        src={backgroundImg}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          filter: 'blur(5px)', // Ejemplo de desenfoque de 5px
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'below',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '100%', // Limitar el ancho máximo
          height: '90%', // Limitar la altura
          overflowY: 'auto', // Permitir desplazamiento vertical
          fontFamilyy: 'Arial, sans-serif',
          textAlign: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundScreen;
