import { gql } from '@apollo/client';

export const GET_REPOSITORIES_BY_USERNAME = gql`
  query GetUserRepositories($login: String!) {
    user(login: $login) {
      repositories(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;
