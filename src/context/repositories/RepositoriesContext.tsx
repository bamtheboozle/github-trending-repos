import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import { RepositoryType } from '../../api/base/repositories';
import { useFetchRepositories } from '../../api/queries/Repository/fetchRepositories';
import { createSearchQuery } from '../../utils/repositories/createSearchQuery';

export enum AvailablePages {
  'trending' = 'trending',
  'starred' = 'starred',
}

type StarredRepositoryType = RepositoryType & {
  starredAt: number;
};

export type RepositoriesContextType = {
  queryPage: number;
  daysBack: number;
  languageFilter?: string;
  activePage: AvailablePages;
  repositoriesList: RepositoryType[];
  starredRepositories: {
    [id: string]: StarredRepositoryType;
  };
  isLoading: boolean;
  setActivePage: (page: AvailablePages) => void;
  handleStar: (repo: RepositoryType) => void;
  setQueryPage: (page: number) => void;
  setLanguageFilter: (lang?: string) => void;
  setDaysBack: (days: number) => void;
};

const Context = createContext<RepositoriesContextType>({
  queryPage: 0,
  daysBack: 7,
  repositoriesList: [],
  starredRepositories: {},
  isLoading: true,
  activePage: AvailablePages.trending,
  setActivePage: () => {},
  handleStar: () => {},
  setQueryPage: () => {},
  setLanguageFilter: () => {},
  setDaysBack: () => {},
});

type RepositoriesContextProviderProps = {
  children: React.ReactNode;
};

const LOCALSTORAGE_REPO_KEY = 'STARRED_REPOSITORIES';

export const RepositoriesContextProvider = ({
  children,
}: RepositoriesContextProviderProps) => {
  const [queryPage, setQueryPage] = useState(0);
  const [languageFilter, setLanguageFilter] = useState<string | undefined>();
  const [daysBack, setDaysBack] = useState<number>(7);
  const query = useMemo(
    () =>
      createSearchQuery({
        daysBack,
        sort: 'stars-desc',
        p: queryPage,
        language: languageFilter,
      }),
    [queryPage, languageFilter, daysBack]
  );

  const { data, isLoading } = useFetchRepositories(query);
  const [activePage, setActivePage] = useState<AvailablePages>(
    AvailablePages.trending
  );
  const [starredRepositories, setStarredRepositories] = useState<{
    [id: string]: StarredRepositoryType;
  }>({});

  useEffect(() => {
    const localStorageStarredRepos = localStorage.getItem(
      LOCALSTORAGE_REPO_KEY
    );
    if (localStorageStarredRepos) {
      setStarredRepositories(JSON.parse(localStorageStarredRepos));
    }
  }, []);

  const handleStar = useCallback(
    (repo: RepositoryType) => {
      if (starredRepositories[repo.id]) {
        const { [repo.id]: deleted, ...rest } = starredRepositories;
        setStarredRepositories(rest);
        localStorage.setItem(LOCALSTORAGE_REPO_KEY, JSON.stringify(rest));
      } else {
        const updatedRepositories = {
          ...starredRepositories,
          [repo.id]: {
            ...repo,
            starredAt: Date.now(),
          },
        };
        setStarredRepositories(updatedRepositories);
        localStorage.setItem(
          LOCALSTORAGE_REPO_KEY,
          JSON.stringify(updatedRepositories)
        );
      }
    },
    [starredRepositories]
  );

  const contextValue = useMemo<RepositoriesContextType>(
    () => ({
      isLoading,
      daysBack,
      languageFilter,
      activePage,
      queryPage,
      setQueryPage,
      setActivePage,
      repositoriesList: data || [],
      starredRepositories,
      handleStar,
      setLanguageFilter,
      setDaysBack,
    }),
    [
      data,
      languageFilter,
      daysBack,
      queryPage,
      setQueryPage,
      starredRepositories,
      isLoading,
      activePage,
      handleStar,
      setDaysBack,
      setActivePage,
      setLanguageFilter,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useRepositoriesContext = () => useContext(Context);
