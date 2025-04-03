import { FC, useRef, useEffect } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { ICommit } from '../../types';
import { Loader } from '../Loader';

interface IProps {
  commits: ICommit[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
}

export const ListOfCommits: FC<IProps> = ({
  commits,
  onLoadMore,
  hasNextPage,
  loading,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !loading) {
        onLoadMore();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, loading, onLoadMore]);

  return (
    <>
      <List>
        {commits.map((commit) => (
          <ListItem key={commit.oid} divider>
            <ListItemText
              primary={
                <Box sx={{ wordBreak: 'break-word' }}>
                  {commit.messageHeadline}
                </Box>
              }
              secondary={`Autor: ${commit.author.name} (${new Date(
                commit.committedDate
              ).toLocaleString()})`}
            />
          </ListItem>
        ))}
      </List>

      {hasNextPage && (
        <Box
          ref={loaderRef}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loading ? <Loader /> : <Box sx={{ height: '20px' }} />}
        </Box>
      )}
    </>
  );
};
