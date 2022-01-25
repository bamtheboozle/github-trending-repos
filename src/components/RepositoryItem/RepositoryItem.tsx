import { Link, Flex, Box, Icon, Button, Text } from '@chakra-ui/react';
import { formatDistance, parseISO } from 'date-fns';
import { MdStar, MdStarOutline, MdShare, MdHistory } from 'react-icons/md';

import { RepositoryType } from '../../api/base/repositories';
import { useRepositoriesContext } from '../../context/repositories/RepositoriesContext';

type RepositoryItemProps = {
  repo: RepositoryType;
  isStarred: boolean;
};

const RepositoryItem = ({ repo, isStarred }: RepositoryItemProps) => {
  const { handleStar } = useRepositoriesContext();

  const handleClick = () => {
    handleStar(repo);
  };
  return (
    <Box borderWidth='1px' borderStyle='solid' borderColor='gray.200' p={2}>
      <Flex w='100%' justifyContent='space-between' alignItems='center'>
        <Box maxW='50%'>
          <Link href={repo.html_url} color='blue.500' pl={4} isExternal>
            <span>{repo.owner.login} / </span>
            <strong>{repo.name}</strong>
          </Link>

          <Text noOfLines={2}>{repo.description}</Text>
        </Box>
        <Box>
          <Button
            size='sm'
            leftIcon={
              isStarred ? <MdStar color='#eac54f' /> : <MdStarOutline />
            }
            colorScheme='gray'
            variant='solid'
            onClick={handleClick}
          >
            {isStarred ? 'Starred' : 'Star'}
          </Button>
        </Box>
      </Flex>
      <Flex w='100%' alignItems='center'>
        <Flex alignItems='center' px={2} gap={1}>
          <Icon as={MdStarOutline} />
          <span>{new Intl.NumberFormat().format(repo.stargazers_count)}</span>
        </Flex>

        <Flex alignItems='center' px={2} gap={1}>
          <Icon as={MdShare} />
          <span>{new Intl.NumberFormat().format(repo.forks_count)}</span>
        </Flex>

        <Flex alignItems='center' px={2} gap={1}>
          <Icon as={MdHistory} />
          <span>{formatDistance(parseISO(repo.created_at), new Date())}</span>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RepositoryItem;
