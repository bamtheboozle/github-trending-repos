import { RepositoriesContextProvider } from '../../context/repositories/RepositoriesContext';
import RepositoryList from './RepositoryList/RepositoryList';

const RepositoriesRootPage = () => (
  <RepositoriesContextProvider>
    <RepositoryList />
  </RepositoriesContextProvider>
);

export default RepositoriesRootPage;
