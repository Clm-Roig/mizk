import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CopyButton from '../../../components/CopyButton';
import Textarea from '../../../components/Textarea';

function WordCounter() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    setResult(inputText.split(' ').filter((n) => n !== '').length);
  }, [inputText]);

  return (
    <>
      <Heading as="h1">Word counter</Heading>

      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputText} onChange={handleInputChange} />
        </VStack>

        <Center>
          <VStack>
            <HStack>
              <Text fontSize="5xl">{result}</Text>
              <Text fontSize="2xl">word{result > 1 ? 's' : ''}</Text>
            </HStack>
            <Box position="relative">
              <CopyButton
                valueToCopy={result}
                size="md"
                position="static"
                successMessage={`${result} copied to your clipboard!`}
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
