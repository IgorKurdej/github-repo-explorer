import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 5) {
      nodes {
        ... on User {
          login
          avatarUrl
        }
      }
    }
  }
`;
