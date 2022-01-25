import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import Header from '../Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Flex>
    <Flex flexDirection='column' width='100%' height='100vh'>
      <Header />
      <Box
        as='main'
        position='relative'
        px={{ md: 16, sm: 8 }}
        py={{ md: 12, sm: 6 }}
        overflow='auto'
        height='100%'
      >
        {children}
      </Box>
    </Flex>
  </Flex>
);

export default Layout;
