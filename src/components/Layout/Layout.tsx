import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import Header from '../Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Flex>
    <Flex flexDirection='column' width='100%' height='100vh'>
      <Header />
      <Box
        position='relative'
        pl={24}
        pr={24}
        pt={12}
        pb={12}
        overflow='auto'
        height='100%'
      >
        {children}
      </Box>
    </Flex>
  </Flex>
);

export default Layout;
