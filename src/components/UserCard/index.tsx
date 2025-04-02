import { FC } from 'react';
import { CardContent, Typography, Avatar, Container } from '@mui/material';
import { useGithubUser } from '../../contexts';

export const UserCard: FC = ({}) => {
  const { selectedUser } = useGithubUser();

  return (
    selectedUser && (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={selectedUser.avatarUrl}
          alt={selectedUser.login}
          sx={{ width: 50, height: 50 }}
        />
        <CardContent>
          <Typography variant='h6' component='div'>
            {selectedUser.login}
          </Typography>
        </CardContent>
      </Container>
    )
  );
};
