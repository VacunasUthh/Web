import React from 'react';
import { Button, Input, InputAdornment, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Container, Title, InputField, Label, SmallIcon, ButtonContainer,InputContainer } from '../../styles/styles';
import POSTAL_CODE_ICON from '../../assets/icons/icons8-código-postal-100.png';
import STATE_ICON from '../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png';
import CITY_ICON from '../../assets/icons/icons8-ciudad-100.png';
import COLONY_ICON from '../../assets/icons/icons8-compra-entregada-100.png';
import STREET_ICON from '../../assets/icons/icons8-calle-100.png';
import NUMBER_ICON from '../../assets/icons/icons8-hashtag-grande-96.png';

const Domicile: React.FC<{
  formRegister: any;
  setFormRegister: (data: any) => void;
  setProgressBar: (data: any) => void;
  progressBar: any;
}> = ({ formRegister, setFormRegister, setProgressBar, progressBar }) => {

  return (
    <Container>
      <Title>Domicilio</Title>   
      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={POSTAL_CODE_ICON} alt="CP" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, cp: e.target.value } })}
          value={formRegister.address.cp}
        />
        <Label>Código Postal</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={STATE_ICON} alt="Estado" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, state: e.target.value } })}
          value={formRegister.address.state}
        />
        <Label>Estado</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={CITY_ICON} alt="Ciudad" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, city: e.target.value } })}
          value={formRegister.address.city}
        />
        <Label>Ciudad</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={COLONY_ICON} alt="Colonia" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, colony: e.target.value } })}
          value={formRegister.address.colony}
        />
        <Label>Colonia</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={STREET_ICON} alt="Calle" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, street: e.target.value } })}
          value={formRegister.address.street}
        />
        <Label>Calle</Label>
      </InputContainer>

      <InputContainer>
        <InputField
          startAdornment={<InputAdornment position="start"><SmallIcon src={NUMBER_ICON} alt="Número" /></InputAdornment>}
          placeholder=""
          onChange={(e) => setFormRegister({ ...formRegister, address: { ...formRegister.address, number: e.target.value } })}
          value={formRegister.address.number}
        />
        <Label>Número</Label>
      </InputContainer>

      <ButtonContainer>
        <Button
          variant="contained"
          color="error"
          onClick={() => setProgressBar({
            ...progressBar,
            positionScreen: formRegister.typeUser === 'paciente' ? 0 : 1
          })}
        >
          Atrás
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setProgressBar({
            ...progressBar,
            positionScreen: 2
          })}
        >
          Siguiente
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default Domicile;
