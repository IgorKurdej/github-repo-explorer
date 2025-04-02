import { FC } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { ICommit } from '../../types';

interface IProps {
  commits: ICommit[];
}

export const ListOfCommits: FC<IProps> = ({ commits }) => {
  return (
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
  );
};
