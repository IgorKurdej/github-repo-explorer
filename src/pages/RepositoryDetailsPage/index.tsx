import { useQuery } from '@apollo/client';
import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_REPOSITORY_DETAILS } from '../../graphql/queries';
import { ErrorAlert, ListOfCommits, Loader } from '../../components';
import {
  IGithubUser,
  IRepositoryResponse,
  IRepositoryVariables,
} from '../../types';
import { Typography, Divider, Container, Button, Box } from '@mui/material';

export const RepositoryDetailsPage: FC = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();

  const selectedUser: IGithubUser | null = useMemo(() => {
    const selectedGithubUser = localStorage.getItem('selectedGithubUser');

    if (!selectedGithubUser) {
      navigate('/');
      return null;
    }

    return JSON.parse(selectedGithubUser);
  }, [navigate]);

  const { data, loading, error } = useQuery<
    IRepositoryResponse,
    IRepositoryVariables
  >(GET_REPOSITORY_DETAILS, {
    variables: {
      owner: selectedUser?.login || '',
      name: repoName!,
    },
    skip: !selectedUser || !repoName,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  if (!data || !data.repository) {
    return <Typography>Nie znaleziono repozytorium</Typography>;
  }

  const { repository } = data;

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap-reverse',
          gap: '6px',
        }}
      >
        <Typography variant='h4' gutterBottom sx={{ wordBreak: 'break-word' }}>
          {repository.name}
        </Typography>
        <Button variant='contained' onClick={() => navigate('/')}>
          Powrót
        </Button>
      </Box>
      <Typography
        variant='body1'
        color='textSecondary'
        sx={{ wordBreak: 'break-word' }}
      >
        {repository.description || 'Brak opisu'}
      </Typography>
      <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
        Data utworzenia: {new Date(repository.createdAt).toLocaleDateString()}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant='body1'>
        🔄 Otwarte pull requesty: {repository.pullRequests.totalCount}
      </Typography>
      <Typography variant='body1'>
        🐛 Otwarte issues: {repository.issues.totalCount}
      </Typography>
      <Typography variant='h6' sx={{ mt: 3 }}>
        Ostatnie commity:
      </Typography>
      <ListOfCommits
        commits={repository.defaultBranchRef?.target?.history.nodes || []}
      />
    </Container>
  );
};
