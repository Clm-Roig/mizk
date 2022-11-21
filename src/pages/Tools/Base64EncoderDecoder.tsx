import { Center, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import Textarea from '../../components/Textarea';

function Base64EncoderDecoder() {
  const [inputValue, setInputValue] = useState('');
  const [base64Value, setBase64Value] = useState('');
  const [error, setError] = useState('');
  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setError('');
    setInputValue(e.currentTarget.value);
  };

  const handleBase64Change = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setError('');
    setBase64Value(e.currentTarget.value);
    try {
      const newInputValue = atob(e.currentTarget.value);
      setInputValue(newInputValue);
    } catch (err) {
      setError('Your base64 text contains an invalid character.');
    }
  };

  useEffect(() => {
    const base64Result = btoa(inputValue);
    setBase64Value(base64Result);
  }, [inputValue]);

  return (
    <>
      <Heading as="h1">Base 64 encoder / decoder</Heading>
      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Heading as="h2" size="md">
            Your text
          </Heading>
          <Textarea value={inputValue} onChange={handleInputChange} />
        </VStack>

        <Icon as={FaExchangeAlt} transform="rotateZ(90deg)" color="gray" />

        <VStack align="left" spacing={2} w="full">
          <Heading as="h2" size="md">
            Your text in base64
          </Heading>
          <Textarea
            isInvalid={error !== ''}
            value={base64Value}
            onInput={handleBase64Change}
          />
          {error && (
            <Center>
              {error && (
                <Text color="red" fontSize="lg">
                  {error}
                </Text>
              )}
            </Center>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default Base64EncoderDecoder;
