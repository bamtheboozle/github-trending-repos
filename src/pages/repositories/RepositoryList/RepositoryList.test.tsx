import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RepositoriesContextProvider } from '../../../context/repositories/RepositoriesContext';
import RepositoryList from './RepositoryList';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RepositoriesContextProvider>{children}</RepositoriesContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
);

describe('RepositoryList', () => {
  it('should render', async () => {
    render(
      <Wrapper>
        <RepositoryList />
      </Wrapper>
    );
    expect(
      screen.getByRole('button', { name: /trending/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /starred/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous/i })
    ).toBeInTheDocument();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(spinner);
    expect(spinner).not.toBeInTheDocument();
  });

  it('should switch from trending to starred and back', async () => {
    render(
      <Wrapper>
        <RepositoryList />
      </Wrapper>
    );
    expect(screen.queryByTestId('trending-repositories')).toBeInTheDocument();
    expect(screen.queryByTestId('starred-repositories')).toBeNull();

    // footer back and next should be visible in trending only
    expect(screen.queryByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /previous/i })
    ).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('button', { name: /starred/i }));

    expect(screen.queryByTestId('trending-repositories')).toBeNull();
    expect(screen.queryByTestId('starred-repositories')).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /next/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /previous/i })).toBeNull();

    await fireEvent.click(screen.getByRole('button', { name: /trending/i }));

    expect(screen.queryByTestId('trending-repositories')).toBeInTheDocument();
    expect(screen.queryByTestId('starred-repositories')).toBeNull();

    expect(screen.queryByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /previous/i })
    ).toBeInTheDocument();
  });

  it('should navigate between query pages', async () => {
    render(
      <Wrapper>
        <RepositoryList />
      </Wrapper>
    );

    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 1/i);

    await fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 2/i);

    await fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 3/i);

    await fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 2/i);

    await fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 1/i);

    await fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.queryByTestId('queryPage')).toHaveTextContent(/Page 1/i);
  });
});

jest.resetAllMocks();
