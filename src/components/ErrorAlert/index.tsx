import { Alert } from '@mui/material';
import { FC } from 'react';

interface IProps {
  message: string;
}

export const ErrorAlert: FC<IProps> = ({ message }) => {
  return <Alert severity='error'>{message}</Alert>;
};
