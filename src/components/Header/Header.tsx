import { Box, Flex, Heading } from '@chakra-ui/react';

const Header = () => (
  <Box
    as='header'
    borderWidth='1px'
    borderStyle='solid'
    borderColor='gray.200'
    backgroundColor='gray.500'
    p={4}
    color='white'
  >
    <Flex alignItems='center' gridGap={5}>
      <Heading as='h1' size='md'>
        Header
      </Heading>
    </Flex>
  </Box>
);

export default Header;
