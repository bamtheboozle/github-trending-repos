import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa';

import { useRepositoriesContext } from '../../../context/repositories/RepositoriesContext';

const RepositoriesFilter = () => {
  const { languageFilter, setLanguageFilter, daysBack, setDaysBack } =
    useRepositoriesContext();
  const mockLanguages = ['Javascript', 'Rails', 'Java'];
  const daysBackOptions = [7, 30, 90, 365];
  return (
    <Flex p={4} gap={2}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaArrowDown />}>
          {`Created in the last ${daysBack} days`}
        </MenuButton>
        <MenuList>
          {daysBackOptions.map(day => (
            <MenuItem
              key={day}
              onClick={() => setDaysBack(day)}
              {...(daysBack === day ? { background: 'blue.200' } : {})}
            >
              {day}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaArrowDown />}>
          {languageFilter || 'Filter by language'}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setLanguageFilter(undefined)}>
            Clear language filter
          </MenuItem>
          {mockLanguages.map(lang => (
            <MenuItem
              key={lang}
              onClick={() => setLanguageFilter(lang)}
              {...(languageFilter === lang ? { background: 'blue.200' } : {})}
            >
              {lang}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default RepositoriesFilter;
