import React, { useState } from 'react';
import { styled } from 'baseui';
import { Input } from '@mui/material';
import { Button } from 'baseui/button';
import USER_ICON from '../../assets/icons/user.png';
import EMAIL_ICON from '../../assets/icons/icons8-correo-100.png';
import PASSWORD_ICON from '../../assets/icons/icons8-candado-100.png';
import { useNavigate } from 'react-router-dom';

// Estilos integrados en el componente utilizando styled-components de baseui
const LoginForm = styled('form', {
    alignItems: 'center',
    padding: '50px',
});

const Title = styled('h2', {
    fontSize: '20px',
    marginVertical: '20px',
    color:'#000000',
    fontWeight: 'bold'
});

const Icon = styled('img', {
    width: '24px',
    height: '24px',
    marginRight: '10px',
});

const StyledInput = styled(Input, {
    marginBottom: '20px', // Cambio en la distancia inferior
    width: '100%',
});

const StyledButton = styled(Button, {
    width: '100%',
});

const TabLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (email && password) {
            try {
                const response = await fetch(`https://vaccinationapi.vercel.app/users/loginWeb`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    alert('Inicio de sesión exitoso.');
                    localStorage.setItem('email', data.email);
                    navigate('/main'); // Navegar a la página de bienvenida
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

    return (
        <LoginForm onSubmit={handleLogin}>
            <Title>Iniciar Sesión</Title>
           
            <div style={{ width: 100, height: 100, marginLeft: 50 }}>
                <Icon style={{ width: 100, height: 100 }} src={USER_ICON} alt="User Icon" />
            </div>

            <div>
                <StyledInput
                    placeholder="Correo"
                    startAdornment={<Icon style={{ width: 30, height: 30 }} src={EMAIL_ICON} alt="Email Icon" />}
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            {/* Campo de entrada para contraseña */}
            <div>
                <StyledInput
                    type="password"
                    placeholder="Contraseña"
                    startAdornment={<Icon style={{ width: 30, height: 30 }} src={PASSWORD_ICON} alt="Password Icon" />}
                    value={password}
                    onChange={handlePasswordChange}
                    
                />
                
            </div>
            <StyledButton type="submit">Acceder</StyledButton> {/* Aplicamos los estilos al botón */}
        </LoginForm>
    );
};

export default TabLogin;

