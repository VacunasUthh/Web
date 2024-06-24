// styles.ts
import { styled } from '@mui/system';
import { Box, Typography, Input } from '@mui/material';

export const Container = styled(Box)({
    padding: '20px',
    width: '100%',
    maxHeight: '500px',
    overflowY: 'auto',
});

export const Title = styled('h2')({
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '1px',
});

export const InputField = styled(Input)({
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    '&:focus + label, &:not(:placeholder-shown) + label': {
        transform: 'translateY(-20px)',
        fontSize: '12px',
        color: '#333',
    },
    '& .MuiInputAdornment-root': {
        marginRight: '10px',
    },
});

export const Label = styled(Typography)({
    position: 'absolute',
    top: '-19px',
    left: '19px',
    padding: '0 5px',
    color: '#003268',
    fontWeight: 'bold',
    fontSize: '17px',
    zIndex: 1,
    pointerEvents: 'none',
    transition: '0.1s ease-out',
});

export const SmallIcon = styled('img')({
    width: '35px',
    height: '35px',
    marginRight: '10px',
});

export const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
});

export const InputContainer = styled('div')({
    marginBottom: '20px',
    position: 'relative',
  });