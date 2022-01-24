import { Box, Flex } from '@chakra-ui/react';

const Header = () => (
  <Box
    borderWidth='1px'
    borderStyle='solid'
    borderColor='gray.200'
    backgroundColor='gray.500'
    p={4}
    color='white'
  >
    <Flex alignItems='center' gridGap={5}>
      <h3>
        <strong>Header</strong>
      </h3>
    </Flex>
  </Box>
);

export default Header;
