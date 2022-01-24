import { useMemo } from 'react';

import { Box, Text } from '@chakra-ui/react';

import RepositoryItem from '../../components/RepositoryItem/RepositoryItem';
import { useRepositoriesContext } from '../../context/repositories/RepositoriesContext';

const StarredRepositories = () => {
  const { starredRepositories } = useRepositoriesContext();

  const starredRepositoriesAsList = useMemo(
    () =>
      Object.values(starredRepositories).sort(
        (a, b) => b.starredAt - a.starredAt
      ),
    [starredRepositories]
  );

  return (
    <Box>
      {starredRepositoriesAsList.length ? (
        starredRepositoriesAsList.map(repo => (
          <RepositoryItem key={repo.id} repo={repo} isStarred />
        ))
      ) : (
        <Box borderWidth='1px' borderStyle='solid' borderColor='gray.200' p={2}>
          <Text>No repositories starred yet.</Text>
        </Box>
      )}
    </Box>
  );
};

export default StarredRepositories;
