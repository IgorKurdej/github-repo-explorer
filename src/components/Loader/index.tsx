import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 4,
        py: 4,
      }}
    >
      <CircularProgress size={25} thickness={4} />
    </Box>
  );
};
