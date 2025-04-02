import { FC, useEffect, useState } from 'react';
import {
  GithubUserSearch,
  ListOfRepositories,
  UserCard,
} from '../../components';
import { IGithubUser } from '../../types';
import { Container } from '@mui/material';
import { GithubUserContext } from '../../contexts';

const DEFAULT_USER = {
  login: 'IgorKurdej',
  avatarUrl:
    'https://avatars.githubusercontent.com/u/48755492?u=2ee521e2091f2fbc4eec3dd22ab95f0c14377ab1&v=4',
};

export const HomePage: FC = () => {
  const [selectedUser, setSelectedUser] = useState<IGithubUser | null>(() => {
    const savedUser = localStorage.getItem('selectedGithubUser');
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedGithubUser', JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <GithubUserContext.Provider value={{ selectedUser, setSelectedUser }}>
        <h1>Wyszukaj użytkownika, żeby zobaczyć listę jego repozytoriów</h1>
        <GithubUserSearch />
        <UserCard />
        <ListOfRepositories />
      </GithubUserContext.Provider>
    </Container>
  );
};
