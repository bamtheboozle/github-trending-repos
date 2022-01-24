import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { subDays, format } from 'date-fns';

import { RepositoryType } from '../../api/base/repositories';
import { useFetchRepositories } from '../../api/queries/Repository/fetchRepositories';

export enum AvailablePages {
  'trending',
  'starred',
}

type StarredRepositoryType = RepositoryType & {
  starredAt: number;
};

type RepositoriesContextType = {
  queryPage: number;
  activePage: AvailablePages;
  repositoriesList: RepositoryType[];
  starredRepositories: {
    [id: string]: StarredRepositoryType;
  };
  isLoading: boolean;
  setActivePage: (page: AvailablePages) => void;
  handleStar: (repo: RepositoryType) => void;
  setQueryPage: (page: number) => void;
};

const Context = createContext<RepositoriesContextType>({
  queryPage: 0,
  repositoriesList: [],
  starredRepositories: {},
  isLoading: true,
  activePage: AvailablePages.trending,
  setActivePage: () => {},
  handleStar: () => {},
  setQueryPage: () => {},
});

type RepositoriesContextProviderProps = {
  children: React.ReactNode;
};

export function RepositoriesContextProvider({
  children,
}: RepositoriesContextProviderProps) {
  const [queryPage, setQueryPage] = useState(0);

  const MAX_DATE_BACK = subDays(new Date(), 7);
  const { data, isLoading } = useFetchRepositories(
    `created:>${format(
      MAX_DATE_BACK,
      'yyyy-MM-dd'
    )}&sort=stars&order=desc&p=${queryPage}`
  );
  const [activePage, setActivePage] = useState<AvailablePages>(
    AvailablePages.trending
  );
  const [starredRepositories, setStarredRepositories] = useState<{
    [id: string]: StarredRepositoryType;
  }>({});

  const handleStar = useCallback(
    (repo: RepositoryType) => {
      if (starredRepositories[repo.id]) {
        const { [repo.id]: deleted, ...rest } = starredRepositories;
        setStarredRepositories(rest);
      } else {
        const updatedRepo = { ...repo, starredAt: Date.now() };
        setStarredRepositories({
          ...starredRepositories,
          [repo.id]: updatedRepo,
        });
      }
    },
    [starredRepositories]
  );

  const contextValue = useMemo<RepositoriesContextType>(
    () => ({
      isLoading,
      activePage,
      queryPage,
      setQueryPage,
      setActivePage,
      repositoriesList: data || [],
      starredRepositories,
      handleStar,
    }),
    [
      data,
      queryPage,
      setQueryPage,
      starredRepositories,
      isLoading,
      activePage,
      handleStar,
      setActivePage,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export const useRepositoriesContext = () => useContext(Context);
