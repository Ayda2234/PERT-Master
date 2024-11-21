import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  return (
    <Box w='40%' display={'flex'}>
      <InputGroup className='input' mr="4" w={'100%'}>
        <Input
          className='search'
          placeholder='  Search ...'
          bg={'gray.100'}
          borderRadius={20}
          border={'#757479'}
          flex="1"
        />
        <InputRightElement w={"3rem"}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Box>

  );
}

export default SearchBar;
