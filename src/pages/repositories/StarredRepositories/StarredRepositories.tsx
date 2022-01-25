import { useMemo } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { isAfter, parseISO, subDays } from 'date-fns';

import RepositoryItem from '../../../components/RepositoryItem/RepositoryItem';
import { useRepositoriesContext } from '../../../context/repositories/RepositoriesContext';

const StarredRepositories = () => {
  const { starredRepositories, daysBack, languageFilter } =
    useRepositoriesContext();

  const starredRepositoriesAsList = useMemo(() => {
    let list = Object.values(starredRepositories).sort(
      (a, b) => b.starredAt - a.starredAt
    );
    if (daysBack) {
      list = list.filter(item =>
        isAfter(parseISO(item.created_at), subDays(Date.now(), daysBack))
      );
    }
    if (languageFilter) {
      list = list.filter(
        item => item.language.toLowerCase() === languageFilter.toLowerCase()
      );
    }
    return list;
  }, [starredRepositories, daysBack, languageFilter]);

  return (
    <Box data-testid='starred-repositories'>
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
