import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  AvailablePages,
  RepositoriesContextProvider,
  useRepositoriesContext,
} from './RepositoriesContext';

jest.resetAllMocks();

const queryClient = new QueryClient();

const contextProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RepositoriesContextProvider>{children}</RepositoriesContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
);

const ContextTestComponent = () => {
  const { isLoading, activePage, setActivePage } = useRepositoriesContext();

  return (
    <>
      <div data-testid='isLoading'>{isLoading}</div>
      <div data-testid='activePage'>{activePage}</div>
      <button
        type='button'
        data-testid='setPageStarred'
        onClick={() => setActivePage(AvailablePages.starred)}
      >
        change to starred
      </button>
      <button
        type='button'
        data-testid='setPageTrending'
        onClick={() => setActivePage(AvailablePages.trending)}
      >
        change to trending
      </button>
    </>
  );
};

describe('RepositoriesContext', () => {
  it('should handle its callback cases', async () => {
    render(<ContextTestComponent />, { wrapper: contextProvider });

    expect(screen.queryByTestId('isLoading')).toBeTruthy();
    expect(screen.queryByTestId('activePage')).toHaveTextContent('trending');

    await fireEvent.click(screen.getByTestId('setPageStarred'));

    expect(screen.queryByTestId('activePage')).toHaveTextContent('starred');

    await fireEvent.click(screen.getByTestId('setPageTrending'));

    expect(screen.queryByTestId('activePage')).toHaveTextContent('trending');

    // expect(
    //   screen.getByRole('button', { name: /trending/i })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole('button', { name: /starred/i })
    // ).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    // expect(
    //   screen.getByRole('button', { name: /previous/i })
    // ).toBeInTheDocument();

    // const spinner = screen.getByTestId('spinner');
    // expect(spinner).toBeInTheDocument();

    // await waitForElementToBeRemoved(spinner);
    // expect(spinner).not.toBeInTheDocument();
  });

  //   it('should switch from trending to starred and back', async () => {
  //     render(
  //       <Wrapper>
  //         <RepositoriesContextProvider>
  //           <div>some children</div>
  //         </RepositoriesContextProvider>
  //       </Wrapper>
  //     );
  //   });
});

jest.resetAllMocks();
