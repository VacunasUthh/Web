import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Container, TextField, Button } from '@mui/material';
import BackgroundScreen from './BackgroundScreen';

const Login: React.FC = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && password) {
      navigate('/welcome');
    }
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Registered:', { username, password });
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
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
