import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Textarea from '../../../components/Textarea';

const NB_ROWS = 6;

enum SORT {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

function ListSorter() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string>('');
  const [sortType, setSortType] = useState<SORT>(SORT.ASCENDING);

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    const lines = inputText.split('\n').filter((x) => x !== '');
    const sorted = lines.sort((l1, l2) => {
      const res = l1.localeCompare(l2, undefined, { numeric: true });
      return sortType === SORT.ASCENDING ? res : -res;
    });
    setResult(sorted.join('\n'));
  }, [inputText, sortType]);

  return (
    <>
      <Heading as="h1">List sorter</Heading>

      <Flex gap={4}>
        <Box flex={1}>
          <Text fontSize="xl">Your list</Text>
          <Textarea
            onChange={handleInputChange}
            rows={NB_ROWS}
            value={inputText}
          />
        </Box>
        <Box flex={1}>
          <Text fontSize="xl">Sorted list</Text>
          <Textarea isReadOnly rows={NB_ROWS} value={result} />
        </Box>
      </Flex>

      <RadioGroup
        mt={2}
        onChange={(v: SORT) => setSortType(v)}
        value={sortType}
      >
        <HStack spacing={4}>
          <Radio value={SORT.ASCENDING}>Ascending sort</Radio>
          <Radio value={SORT.DESCENDING}>Descending sort</Radio>
        </HStack>
      </RadioGroup>

      <Center mt={2}>
        <Button size={['sm', 'md']} onClick={() => setInputText('')}>
          Reset
        </Button>
      </Center>
    </>
  );
}

export default ListSorter;
