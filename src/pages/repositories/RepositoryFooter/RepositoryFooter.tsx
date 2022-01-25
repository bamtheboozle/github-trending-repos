import { Button, Flex, Text } from '@chakra-ui/react';

import { useRepositoriesContext } from '../../../context/repositories/RepositoriesContext';

const RepositoryFooter = () => {
  const { queryPage, setQueryPage } = useRepositoriesContext();

  const handleNext = () => setQueryPage(queryPage + 1);
  const handlePrev = () => {
    if (queryPage - 1 < 0) setQueryPage(0);
    else setQueryPage(queryPage - 1);
  };

  return (
    <Flex
      as='footer'
      role='contentinfo'
      p='4'
      backgroundColor='gray.200'
      justifyContent='space-between'
      alignItems='center'
    >
      <Button onClick={handlePrev} disabled={queryPage === 0} name='previous'>
        previous
      </Button>
      <Text data-testid='queryPage'>Page {queryPage + 1}</Text>
      <Button onClick={handleNext} name='next'>
        next
      </Button>
    </Flex>
  );
};

export default RepositoryFooter;
