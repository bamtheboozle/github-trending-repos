import { useQuery } from 'react-query';

import { getRepositories } from '../../base/repositories';

export const useFetchRepositories = (q: string) => {
  const { isLoading, data, error } = useQuery(
    ['fetchRepositories', q],
    ({ queryKey }) =>
      getRepositories(queryKey[1]).then(response => response.items),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, data, error };
};
