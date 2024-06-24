import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import GeneralData from './GeneralData';
import Domicile from './Domicile';
import Contact from './Contact';
import CustomTabs from './Tabs'; 
import { API_URL } from "../../utils/constants";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const TabRegister: React.FC = () => {
  const [formRegister, setFormRegister] = useState({
    curp: '',
    name: '',
    lastName: '',
    motherLastName: '',
    birthDate: '',
    gender: '', // Añadido
    address: {
      cp: '',
      state: '',
      city: '',
      colony: '',
      street: '',
      number: '',
    },
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    typeUser: 'trabajador', // o 'paciente', dependiendo de tus requisitos
    idWorker: '', // Opcional
    profession: '', // Opcional
    cedula: '', // Opcional
    institution: '', // Opcional
    position: '', // Opcional
  });

  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onSubmitRegister = async () => {
    console.log('formRegister:', formRegister);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegister),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registro exitoso:', data);
        // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
      } else {
        console.error('Error al registrar:', response.statusText);
        // Aquí podrías manejar el error mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Manejo de errores generales
    }
  };
  

  return (
    <div>
      <CustomTabs selectedIndex={value} setIndex={setValue} /> 
      <TabPanel value={value} index={0}>
        <GeneralData
          formRegister={formRegister}
          setFormRegister={setFormRegister}
          selectedIndex={selectedIndex}
          setIndex={setSelectedIndex}
          progressBar={{ positionScreen: value }}
          setProgressBar={({ positionScreen }) => setValue(positionScreen)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Domicile
          formRegister={formRegister}
          setFormRegister={setFormRegister}
          progressBar={{ positionScreen: value }}
          setProgressBar={({ positionScreen }) => setValue(positionScreen)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Contact
          formRegister={formRegister}
          setFormRegister={setFormRegister}
          onSubmitRegister={onSubmitRegister}
          progressBar={{ positionScreen: value }}
          setProgressBar={({ positionScreen }) => setValue(positionScreen)}
        />
      </TabPanel>
    </div>
  );
};

export default TabRegister;
