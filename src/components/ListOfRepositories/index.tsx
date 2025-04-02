import { useQuery } from '@apollo/client';
import { FC, useMemo } from 'react';
import { GET_REPOSITORIES_BY_USERNAME } from '../../graphql/queries';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  IGetRepositoriesByUsernameVariables,
  IUserRepositoriesResponse,
} from '../../types';
import { Link } from 'react-router-dom';
import { ErrorAlert, Loader } from '../';
import { useGithubUser } from '../../contexts';

export const ListOfRepositories: FC = () => {
  const { selectedUser } = useGithubUser();

  if (!selectedUser?.login) {
    return <Typography variant='body1'>Brak wybranego użytkownika</Typography>;
  }

  const { data, loading, error } = useQuery<
    IUserRepositoriesResponse | undefined,
    IGetRepositoriesByUsernameVariables
  >(GET_REPOSITORIES_BY_USERNAME, {
    variables: { login: selectedUser.login },
    skip: !selectedUser?.login,
  });

  const repositories = useMemo(() => {
    return data?.user.repositories.nodes || [];
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorAlert message='Wystąpił błąd podczas ładowania repozytoriów. Spróbuj ponownie później.' />
    );
  }

  return (
    <List>
      {repositories.length > 0 ? (
        repositories.map(({ name }) => (
          <ListItem
            key={name}
            component={Link}
            to={`/repo-details/${name}`}
            state={{ login: selectedUser.login }}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))
      ) : (
        <Typography variant='body1'>
          Brak repozytoriów do wyświetlenia 😢
        </Typography>
      )}
    </List>
  );
};
