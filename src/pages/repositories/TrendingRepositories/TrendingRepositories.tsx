import { Box, Text } from '@chakra-ui/react';

import RepositoryItem from '../../../components/RepositoryItem/RepositoryItem';
import Spinner from '../../../components/Spinner/Spinner';
import { useRepositoriesContext } from '../../../context/repositories/RepositoriesContext';

const TrendingRepositories = () => {
  const { isLoading, repositoriesList, starredRepositories } =
    useRepositoriesContext();

  return (
    <Box data-testid='trending-repositories'>
      {isLoading ? (
        <Spinner />
      ) : repositoriesList.length ? (
        repositoriesList.map(repo => (
          <RepositoryItem
            key={repo.id}
            repo={repo}
            isStarred={!!starredRepositories[repo.id]}
          />
        ))
      ) : (
        <Box borderWidth='1px' borderStyle='solid' borderColor='gray.200' p={2}>
          <Text>No data available.</Text>
        </Box>
      )}
    </Box>
  );
};

export default TrendingRepositories;
