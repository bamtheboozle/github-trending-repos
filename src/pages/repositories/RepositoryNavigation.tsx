import { Flex, Button, ButtonGroup } from '@chakra-ui/react';

import {
  AvailablePages,
  useRepositoriesContext,
} from '../../context/repositories/RepositoriesContext';

const RepositoryNavigation = () => {
  const { activePage, setActivePage } = useRepositoriesContext();
  return (
    <Flex backgroundColor='gray.200' justifyContent='space-between' p={4}>
      <ButtonGroup isAttached>
        <Button
          {...(activePage === AvailablePages.trending
            ? { colorScheme: 'blue' }
            : {})}
          onClick={() => setActivePage(AvailablePages.trending)}
        >
          Trending
        </Button>
        <Button
          {...(activePage === AvailablePages.starred
            ? { colorScheme: 'blue' }
            : {})}
          onClick={() => setActivePage(AvailablePages.starred)}
        >
          Starred
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default RepositoryNavigation;
