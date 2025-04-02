import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const ConnectionErrorPage: FC = () => {
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
      <Typography variant='h4' color='error' sx={{ mb: 2 }}>
        Wystąpił problem z połączeniem!
      </Typography>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Nie udało się nawiązać połączenia z serwerem. Sprawdź swoje połączenie
        internetowe lub spróbuj ponownie później.
      </Typography>
    </Box>
  );
};
