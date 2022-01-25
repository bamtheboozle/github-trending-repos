import { Flex, Button, ButtonGroup } from '@chakra-ui/react';

import {
  AvailablePages,
  useRepositoriesContext,
} from '../../../context/repositories/RepositoriesContext';

const RepositoryNavigation = () => {
  const { activePage, setActivePage } = useRepositoriesContext();
  return (
    <Flex p={4}>
      <ButtonGroup isAttached>
        <Button
          {...(activePage === AvailablePages.trending
            ? { colorScheme: 'blue' }
            : {})}
          name='trending'
          onClick={() => setActivePage(AvailablePages.trending)}
        >
          Trending
        </Button>
        <Button
          {...(activePage === AvailablePages.starred
            ? { colorScheme: 'blue' }
            : {})}
          name='starred'
          onClick={() => setActivePage(AvailablePages.starred)}
        >
          Starred
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default RepositoryNavigation;
