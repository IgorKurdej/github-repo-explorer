import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorAlert, ListOfCommits, Loader } from '../../components';
import { Typography, Divider, Container, Button, Box } from '@mui/material';
import { useRepositoryCommits, useSelectedUser } from '../../hooks';

export const RepositoryDetailsPage: FC = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();

  const selectedUser = useSelectedUser();

  const {
    data,
    loading,
    error,
    commits,
    hasNextPage,
    loadingMore,
    loadMoreCommits,
  } = useRepositoryCommits(selectedUser?.login || '', repoName || '', 10);

  if (loading && !loadingMore) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  if (!data || !data.repository) {
    return <ErrorAlert message='Nie znaleziono repozytorium' />;
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
        commits={commits}
        onLoadMore={loadMoreCommits}
        hasNextPage={hasNextPage}
        loading={loadingMore}
      />
    </Container>
  );
};
