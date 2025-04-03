import { gql } from '@apollo/client';

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails(
    $owner: String!
    $name: String!
    $first: Int!
    $after: String
  ) {
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
            history(first: $first, after: $after) {
              pageInfo {
                hasNextPage
                endCursor
              }
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
