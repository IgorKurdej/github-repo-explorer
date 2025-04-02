import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: 'background.paper',
        p: 3,
      }}
    >
      <Typography variant='h3' color='error'>
        Oops! Coś poszło nie tak.
      </Typography>
      <Typography variant='h5' sx={{ mb: 3 }}>
        Strona, którą próbujesz odwiedzić, nie istnieje lub wystąpił błąd.
      </Typography>
      <Button variant='contained' color='primary' onClick={handleGoHome}>
        Wróć na stronę główną
      </Button>
    </Box>
  );
};
