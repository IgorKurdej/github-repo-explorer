import { gql } from '@apollo/client';

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      createdAt
      url
      owner {
        login
        avatarUrl
      }
      pullRequests(states: OPEN) {
        totalCount
      }
      issues(states: OPEN) {
        totalCount
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 10) {
              nodes {
                id
                messageHeadline
                committedDate
                author {
                  name
                  email
                  avatarUrl
                }
                oid
              }
            }
          }
        }
      }
    }
  }
`;
