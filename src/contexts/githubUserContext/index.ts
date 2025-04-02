import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { IGithubUser } from '../../types';

interface GithubUserContextProps {
  selectedUser: IGithubUser | null;
  setSelectedUser: Dispatch<SetStateAction<IGithubUser | null>>;
}

export const GithubUserContext = createContext<
  GithubUserContextProps | undefined
>(undefined);

export const useGithubUser = (): GithubUserContextProps => {
  const context = useContext(GithubUserContext);

  if (!context) {
    throw new Error('useGithubUser must be used within a GithubUserProvider');
  }

  return context;
};
