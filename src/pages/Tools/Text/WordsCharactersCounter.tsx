import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CopyButton from '../../../components/CopyButton';
import Textarea from '../../../components/Textarea';

function WordsCharactersCounter() {
  const [inputText, setInputText] = useState('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    setWordCount(
      inputText
        .trim()
        .split(' ')
        .filter((n) => n !== '').length
    );
    setCharacterCount(inputText.trim().length);
  }, [inputText]);

  return (
    <>
      <Heading as="h1">Words / characters counter</Heading>

      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputText} onChange={handleInputChange} />
        </VStack>

        <Center>
          <VStack>
            <VStack>
              <HStack>
                <Text fontSize="5xl">{wordCount}</Text>
                <Text fontSize="2xl">word{wordCount > 1 ? 's' : ''}</Text>
              </HStack>
              <HStack>
                <Text fontSize="5xl">{characterCount}</Text>
                <Text fontSize="2xl">
                  character{characterCount > 1 ? 's' : ''}
                </Text>
              </HStack>
            </VStack>
            <Box position="relative">
              <CopyButton
                valueToCopy={wordCount}
                size="md"
                position="static"
                successMessage={`${wordCount} copied to your clipboard!`}
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

export default WordsCharactersCounter;
