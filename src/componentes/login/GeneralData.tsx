import React, { useState } from 'react';
import { Button, Checkbox, Input, InputAdornment, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Container, Title, InputField, Label, SmallIcon, ButtonContainer ,InputContainer} from '../../styles/styles';
import USER_ICON from '../../assets/icons/icons8-tipo-de-piel-masculina-del-usuario-del-círculo-7-96.png';
import USER_ICON2 from '../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png';
import USER_ICON3 from '../../assets/icons/icons8-usuario-masculino-en-círculo-100.png';
import USER_ICON4 from '../../assets/icons/icons8-usuario-masculino-en-círculo-100.png';
import USER_ICON5 from '../../assets/icons/icons8-calendario-100.png';
import USER_ICON6 from '../../assets/icons/icons8-sexo-100.png';


const SubTitle = styled(Typography)({
  fontSize: '15px',
  color: '#888',
  textAlign: 'center',
  marginBottom: '10px',
});

const StyledImage = styled('img')({
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  margin: '0 auto 10px',
});

const CheckboxGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const CheckboxLabel = styled(Typography)({
  marginLeft: '5px',
});


interface Props {
  formRegister: any;
  setFormRegister: (data: any) => void;
  selectedIndex: number;
  setIndex: (index: number) => void;
  progressBar: any;
  setProgressBar: (data: any) => void;
}

const GeneralData: React.FC<Props> = ({
  formRegister,
  setFormRegister,
  selectedIndex,
  setIndex,
  progressBar,
  setProgressBar,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (gender: string) => {
    setFormRegister({ ...formRegister, gender });
  };

  return (
    <Container>
      <Title>Datos Personales</Title>
      <div>
        {profileImage ? (
          <StyledImage src={profileImage} alt="User Icon" />
        ) : (
          <StyledImage src={USER_ICON} alt="User Icon" />
        )}
        
        <SubTitle>Foto de Perfil</SubTitle>
        <InputContainer>
          <InputField
            type="file"
            id="profile-image"
            style={{ display: 'none' , alignItems:'center'}}
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image">
            <Button component="span" variant="outlined" color="primary">
              Subir Foto
            </Button>
          </label>
        </InputContainer>
      </div>
      <div>
        <InputContainer>
          <InputField
            startAdornment={<InputAdornment position="start"><SmallIcon src={USER_ICON2} alt="curp" /></InputAdornment>}
            placeholder=''
            onChange={(e) => setFormRegister({ ...formRegister, curp: e.target.value })}
            value={formRegister.curp}
          />
          <Label>CURP</Label>
        </InputContainer>
        <InputContainer>
          <InputField
            startAdornment={<InputAdornment position="start"><SmallIcon src={USER_ICON3} alt="nombre" /></InputAdornment>}
            placeholder=''
            onChange={(e) => setFormRegister({ ...formRegister, name: e.target.value })}
            value={formRegister.name}
          />
          <Label>Nombre</Label>
        </InputContainer>
        <InputContainer>
          <InputField
            startAdornment={<InputAdornment position="start"><SmallIcon src={USER_ICON4} alt="apellido-paterno" /></InputAdornment>}
            placeholder=''
            onChange={(e) => setFormRegister({ ...formRegister, lastName: e.target.value })}
            value={formRegister.lastName}
          />
          <Label>Apellido Paterno</Label>
        </InputContainer>
        <InputContainer>
          <InputField
            startAdornment={<InputAdornment position="start"><SmallIcon src={USER_ICON4} alt="apellido-materno" /></InputAdornment>}
            placeholder=''
            onChange={(e) => setFormRegister({ ...formRegister, motherLastName: e.target.value })}
            value={formRegister.motherLastName}
          />
          <Label>Apellido Materno</Label>
        </InputContainer>
        <InputContainer>
          <InputField
            startAdornment={<InputAdornment position="start"><SmallIcon src={USER_ICON5} alt="fecha-nacimiento" /></InputAdornment>}
            placeholder=''
            onChange={(e) => setFormRegister({ ...formRegister, birthDate: e.target.value })}
            value={formRegister.birthDate}
          />
          <Label>Fecha de nacimiento</Label>
        </InputContainer>
        <div>
          <InputContainer>
            <CheckboxGroup>
              <SmallIcon src={USER_ICON6} alt="sexo" />
              <Checkbox
                checked={formRegister.gender === 'Masculino'}
                onChange={() => handleGenderChange('Masculino')}
              />
              <CheckboxLabel>Masculino</CheckboxLabel>
              <Checkbox
                checked={formRegister.gender === 'Femenino'}
                onChange={() => handleGenderChange('Femenino')}
              />
              <CheckboxLabel>Femenino</CheckboxLabel>
            </CheckboxGroup>
            <Label>Sexo</Label>
          </InputContainer>
        </div>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setProgressBar({ positionScreen: 1 })}
          >
            Siguiente
          </Button>
        </ButtonContainer>
      </div>
    </Container>
  );
}

export default GeneralData;
