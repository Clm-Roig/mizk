import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Switch,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import CopyButton from '../../../components/CopyButton';
import Textarea from '../../../components/Textarea';

function WordCounter() {
  const [inputText, setInputText] = useState('');
  const [wordNb, setWordNb] = useState<number>(0);
  const [characterNb, setCharacterNb] = useState<number>(0);
  const [ignoreSpaces, setIgnoreSpaces] = useBoolean(false);

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    setWordNb(inputText.split(' ').filter((n) => n !== '').length);
    if (ignoreSpaces) {
      setCharacterNb(
        inputText.split('').filter((n) => n !== '' && n !== ' ').length
      );
    } else {
      setCharacterNb(inputText.split('').filter((n) => n !== '').length);
    }
  }, [inputText, ignoreSpaces]);

  const valueToCopy = useMemo(
    () =>
      `${wordNb} word${wordNb > 1 && 's'} & ${characterNb} character${
        characterNb > 1 && 's'
      }`,
    [characterNb, wordNb]
  );

  return (
    <>
      <Heading as="h1">Word counter</Heading>

      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputText} onChange={handleInputChange} />
        </VStack>

        <FormControl display="flex" alignItems="center">
          <Switch
            id="ignore-spaces"
            isChecked={ignoreSpaces}
            onChange={setIgnoreSpaces.toggle}
            mr={2}
          />
          <FormLabel htmlFor="ignore-spaces" mb={0}>
            Ignore spaces (for character count)
          </FormLabel>
        </FormControl>

        <Center>
          <VStack>
            <HStack>
              <Text fontSize="5xl">{wordNb}</Text>
              <Text fontSize="2xl">word{wordNb > 1 ? 's' : ''}</Text>
              <Text fontSize="2xl">&</Text>
              <Text fontSize="5xl">{characterNb}</Text>
              <Text fontSize="2xl">character{characterNb > 1 ? 's' : ''}</Text>
            </HStack>
            <Box position="relative">
              <CopyButton
                valueToCopy={valueToCopy}
                size="md"
                position="static"
                successMessage={`${valueToCopy} copied to your clipboard!`}
              >
                Copy result
              </CopyButton>
            </Box>
          </VStack>
        </Center>
      </VStack>
    </>
  );
}

export default WordCounter;
