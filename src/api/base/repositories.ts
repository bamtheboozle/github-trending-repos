import API_PATH from '../constants';
import request from './typedFetch';

const REPOSITORIES_URL = `${API_PATH}/search/repositories`;

export type RepositoryType = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
    url: string;
    login: string;
  };
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  language: string;
};
type SearchRepositoriesResponseType = {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryType[];
};

export const getRepositories = (query: string) =>
  request<SearchRepositoriesResponseType>(`${REPOSITORIES_URL}?q=${query}`);
