import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = () => (
  <Flex
    height='100px'
    width='100%'
    alignItems='center'
    justifyContent='center'
    data-testid='spinner'
  >
    <ChakraSpinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  </Flex>
);

export default Spinner;
