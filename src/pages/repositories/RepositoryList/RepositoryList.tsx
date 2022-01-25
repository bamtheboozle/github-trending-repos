import { Box, Flex } from '@chakra-ui/react';

import {
  AvailablePages,
  useRepositoriesContext,
} from '../../../context/repositories/RepositoriesContext';
import RepositoriesFilter from '../RepositoriesFilter/RepositoriesFilter';
import RepositoryFooter from '../RepositoryFooter/RepositoryFooter';
import RepositoryNavigation from '../RepositoryNavigation/RepositoryNavigation';
import StarredRepositories from '../StarredRepositories/StarredRepositories';
import TrendingRepositories from '../TrendingRepositories/TrendingRepositories';

const RepositoryList = () => {
  const { activePage } = useRepositoriesContext();

  return (
    <Box>
      <Flex flexDir='column'>
        <Flex backgroundColor='gray.200' justifyContent='space-between'>
          <RepositoryNavigation />
          <RepositoriesFilter />
        </Flex>
        <Flex flexDir='column' maxH='500px' overflowY='auto'>
          {activePage === AvailablePages.trending && <TrendingRepositories />}
          {activePage === AvailablePages.starred && <StarredRepositories />}
        </Flex>

        {activePage === AvailablePages.trending && <RepositoryFooter />}
      </Flex>
    </Box>
  );
};

export default RepositoryList;
