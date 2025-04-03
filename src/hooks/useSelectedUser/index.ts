import { IGithubUser } from '../../types';

export const useSelectedUser = (): IGithubUser | null => {
  const selectedGithubUser = localStorage.getItem('selectedGithubUser');

  if (!selectedGithubUser) {
    return null;
  }

  return JSON.parse(selectedGithubUser);
};
