import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import backgroundImg from '../image/Fondo.png';

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
      <Box
        component="img"
        src={backgroundImg}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundScreen;
