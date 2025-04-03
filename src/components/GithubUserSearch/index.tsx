import { FC, useMemo, useState } from 'react';
import { TextField, Autocomplete, Avatar } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries';
import { useDebounce } from '../../hooks';
import { IGetGithubUsersVariables, ISearchUsersResponse } from '../../types';
import { useGithubUser } from '../../contexts';
import { ErrorAlert } from '../ErrorAlert';

export const GithubUserSearch: FC = () => {
  const { selectedUser, setSelectedUser } = useGithubUser();

  const [inputValue, setInputValue] = useState(selectedUser?.login || '');
  const debouncedInputValues = useDebounce(inputValue, 750);

  const { data, loading, error } = useQuery<
    ISearchUsersResponse,
    IGetGithubUsersVariables
  >(GET_USERS, {
    variables: {
      query: debouncedInputValues,
    },
    skip: debouncedInputValues.length < 2,
  });

  const usersOptions = useMemo(() => {
    return data ? data.search.nodes : [];
  }, [data]);

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  return (
    <Autocomplete
      freeSolo
      options={usersOptions}
      getOptionLabel={(option) =>
        typeof option === 'string' ? '' : option.login
      }
      filterOptions={(x) => x}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      onChange={(_, value) => {
        if (value && typeof value !== 'string') {
          setSelectedUser(value);
        }
      }}
      inputValue={inputValue}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Wyszukaj użytkownika GitHub'
          variant='outlined'
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
            },
            htmlInput: {
              id: 'github-user-search-input',
              ...params.inputProps,
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.login}>
          <Avatar
            src={option.avatarUrl}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          {option.login}
        </li>
      )}
    />
  );
};
