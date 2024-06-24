import React, { useState } from 'react';
import { Button, Input, InputAdornment, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PHONE_ICON from '../../assets/icons/icons8-teléfono-100.png';
import EMAIL_ICON from '../../assets/icons/icons8-correo-100.png';
import PASSWORD_ICON from '../../assets/icons/icons8-candado-100.png';
import { Container, Title, InputField, Label, SmallIcon, ButtonContainer,InputContainer } from '../../styles/styles';

const ShowHideButton = styled(Button)({
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  padding: '6px',
});

const Contact: React.FC<{
  onSubmitRegister: () => void;
  formRegister: any;
  setFormRegister: (data: any) => void;
  progressBar: any;
  setProgressBar: (data: any) => void;
}> = ({ onSubmitRegister, formRegister, setFormRegister, progressBar, setProgressBar }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: string) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Container>
      <Title>Seguridad</Title>
      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><img src={PHONE_ICON} alt="Teléfono" style={{ width: 30, height: 30 }} /></InputAdornment>}
          placeholder=''
          onChange={(e) => setFormRegister({ ...formRegister, phone: e.target.value })}
          value={formRegister.phone}
        />
        <Label>Teléfono</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={EMAIL_ICON} alt="Correo" /></InputAdornment>}
          placeholder=''
          onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
          value={formRegister.email}
        />
        <Label>Correo</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          type={showPassword ? 'text' : 'password'}
          startAdornment={<InputAdornment position="start"><SmallIcon src={PASSWORD_ICON} alt="Contraseña" /></InputAdornment>}
          placeholder=''
          onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
          value={formRegister.password}
        />
        <Label>Contraseña</Label>
        <ShowHideButton onClick={() => togglePasswordVisibility('password')}>
          {showPassword ? (
            <SmallIcon src={PASSWORD_ICON} alt="Ocultar Contraseña" />
          ) : (
            <SmallIcon src={PASSWORD_ICON} alt="Mostrar Contraseña" />
          )}
        </ShowHideButton>
      </InputContainer>

      <InputContainer>
        <InputField
          type={showConfirmPassword ? 'text' : 'password'}
          startAdornment={<InputAdornment position="start"><SmallIcon src={PASSWORD_ICON} alt="Confirmar Contraseña" /></InputAdornment>}
          placeholder=''
          onChange={(e) => setFormRegister({ ...formRegister, confirmPassword: e.target.value })}
          value={formRegister.confirmPassword}
        />
        <Label>Confirmar Contraseña</Label>
        <ShowHideButton onClick={() => togglePasswordVisibility('confirmPassword')}>
          {showConfirmPassword ? (
            <SmallIcon src={PASSWORD_ICON} alt="Ocultar Contraseña" />
          ) : (
            <SmallIcon src={PASSWORD_ICON} alt="Mostrar Contraseña" />
          )}
        </ShowHideButton>
      </InputContainer>

      <ButtonContainer>
        <Button
          variant="contained"
          color="error"
          onClick={() => setProgressBar({ ...progressBar, positionScreen: 0 })}
        >
          Atrás
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setProgressBar({ ...progressBar, positionScreen: 2 })}
        >
          Siguiente
        </Button>
      </ButtonContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitRegister}
        >
          Registrar
        </Button>
      </Box>
    </Container>
  );
}

export default Contact;
