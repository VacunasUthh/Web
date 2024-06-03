import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Container, TextField, Button } from '@mui/material';
import BackgroundScreen from './BackgroundScreen';
import { API_URL } from "../utils/constants";

const Login: React.FC = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(`https://vaccinationapi.vercel.app/auth/loginWeb`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('Inicio de sesión exitoso.');
          localStorage.setItem('token', data.token);
          navigate('/welcome');
        } else {
          const data = await response.json();
          alert('Error en el inicio de sesión');
          if (data.message === 'Acceso denegado para pacientes.') {
            alert('Acceso denegado: No tienes permiso para ingresar como paciente.');
          } else {
            console.log(data.message || 'Error al iniciar sesión');
          }
        }
      } catch (error) {
        console.log('Error en la solicitud de inicio de sesión: ' + error);
      }
    }
  };
  
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(`${API_URL}/auth/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('Respuesta del servidor: ' + data.message);
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error al registrarse');
        }
      } catch (error) {
        alert('Error al conectar con el servidor: ' + error);
      }
    }
  };
  
  
  

  return (
    <BackgroundScreen>
      <Container maxWidth="sm">
        <Box
          bgcolor="#ccc"
          borderRadius="30px"
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Tabs
            value={tabSelected}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Iniciar Sesión" />
            <Tab label="Registrarme" />
          </Tabs>
        </Box>
        <Box
          mt={2}
          bgcolor="white"
          p={3}
          borderRadius="10px"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        >
          {tabSelected === 0 && (
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          )}
          {tabSelected === 1 && (
            <form onSubmit={handleRegister}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </BackgroundScreen>
  );
};

export default Login;
