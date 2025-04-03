import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORY_DETAILS } from '../../graphql/queries';
import {
  IRepositoryResponse,
  IRepositoryVariables,
  ICommit,
} from '../../types';

interface UseRepositoryCommitsResult {
  loading: boolean;
  error: any;
  data: IRepositoryResponse | undefined;
  commits: ICommit[];
  hasNextPage: boolean;
  loadingMore: boolean;
  loadMoreCommits: () => Promise<void>;
}

export const useRepositoryCommits = (
  owner: string,
  name: string,
  itemsPerPage: number = 10
): UseRepositoryCommitsResult => {
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<
    IRepositoryResponse,
    IRepositoryVariables
  >(GET_REPOSITORY_DETAILS, {
    variables: {
      owner,
      name,
      first: itemsPerPage,
      after: null,
    },
    skip: !owner || !name,
  });

  const commits =
    data?.repository?.defaultBranchRef?.target?.history?.nodes || [];
  const hasNextPage =
    data?.repository?.defaultBranchRef?.target?.history?.pageInfo
      ?.hasNextPage || false;

  const loadMoreCommits = async () => {
    const historyData = data?.repository?.defaultBranchRef?.target?.history;
    if (!historyData?.pageInfo?.hasNextPage) {
      return;
    }

    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          after: historyData.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            !fetchMoreResult.repository ||
            !fetchMoreResult.repository.defaultBranchRef ||
            !fetchMoreResult.repository.defaultBranchRef.target ||
            !fetchMoreResult.repository.defaultBranchRef.target.history
          ) {
            return prevResult;
          }

          const prevHistory =
            prevResult.repository?.defaultBranchRef?.target?.history;
          const newHistory =
            fetchMoreResult.repository.defaultBranchRef.target.history;

          const prevNodes = prevHistory?.nodes || [];
          const newNodes = newHistory.nodes || [];

          const uniqueNewNodes = newNodes.filter(
            (newNode) =>
              !prevNodes.some((prevNode) => prevNode.oid === newNode.oid)
          );

          return {
            ...prevResult,
            repository: {
              ...prevResult.repository,
              defaultBranchRef: {
                ...prevResult.repository.defaultBranchRef,
                target: {
                  ...prevResult.repository.defaultBranchRef?.target,
                  history: {
                    ...newHistory,
                    nodes: [...prevNodes, ...uniqueNewNodes],
                  },
                },
              },
            },
          };
        },
      });
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    loading,
    error,
    data,
    commits,
    hasNextPage,
    loadingMore,
    loadMoreCommits,
  };
};
