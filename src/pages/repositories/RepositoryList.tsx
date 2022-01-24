import { Box, Flex, Button } from '@chakra-ui/react';

import Spinner from '../../components/Spinner/Spinner';
import {
  AvailablePages,
  useRepositoriesContext,
} from '../../context/repositories/RepositoriesContext';
import RepositoryNavigation from './RepositoryNavigation';
import StarredRepositories from './StarredRepositories';
import TrendingRepositories from './TrendingRepositories';

const RepositoryList = () => {
  const { isLoading, activePage, queryPage, setQueryPage } =
    useRepositoriesContext();

  const handleNext = () => setQueryPage(queryPage + 1);
  const handlePrev = () => {
    if (queryPage - 1 < 0) setQueryPage(0);
    else setQueryPage(queryPage - 1);
  };

  return (
    <Box>
      <Flex flexDir='column'>
        <RepositoryNavigation />
        <Flex flexDir='column' maxH='500px' overflowY='auto'>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {activePage === AvailablePages.trending && (
                <TrendingRepositories />
              )}
              {activePage === AvailablePages.starred && <StarredRepositories />}
            </>
          )}
        </Flex>

        {activePage === AvailablePages.trending && (
          <Flex
            as='footer'
            role='contentinfo'
            p='4'
            backgroundColor='gray.200'
            justifyContent='space-between'
          >
            <Button onClick={handlePrev} disabled={queryPage === 0}>
              previous
            </Button>
            <Button onClick={handleNext}>next</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default RepositoryList;
