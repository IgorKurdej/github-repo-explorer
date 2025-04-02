import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout: FC = () => {
  return (
    <Container maxWidth='md'>
      <Box sx={{ paddingY: 6 }}>
        <Outlet />
      </Box>
    </Container>
  );
};
