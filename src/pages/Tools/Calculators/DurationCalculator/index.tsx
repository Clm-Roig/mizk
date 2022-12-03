import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import parse from 'parse-duration';
import React, { useEffect, useState } from 'react';
import Textarea from '../../../../components/Textarea';

import computeDurationToString from './computeDurationToString';
import OperationButtons from './OperationButtons';
import Tooltip from './Tooltip';
import SupportedOperations from './types';
// Configure duration parsing to allow only h, m, s
delete parse.yr;
delete parse.y;
delete parse.w;
delete parse.wk;
delete parse.d;

function DurationCalculator() {
  const toast = useToast();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [resultString, setResultString] = useState('');

  useEffect(() => {
    const { result, error: err } = computeDurationToString(inputValue);
    setResultString(result);
    setError(err);
  }, [inputValue]);

  const copyResult = () => {
    navigator.clipboard.writeText(resultString);
    toast({
      title: 'Result copied to your clipboard!',
      status: 'success',
      position: 'top',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setInputValue(e.currentTarget.value);

  const resetInput = () => {
    setInputValue('');
  };

  const appendToInput = (value: string, symbol: SupportedOperations) => {
    if (inputValue === '' && symbol === SupportedOperations.SUBSTRACT) return;
    if (inputValue === '') {
      setInputValue(`${value} `);
    } else if (inputValue[inputValue.length - 1] === ' ') {
      setInputValue((prevValue) => `${prevValue}${symbol} ${value} `);
    } else {
      setInputValue((prevValue) => `${prevValue} ${symbol} ${value} `);
    }
  };

  return (
    <div>
      <Heading as="h1">Duration calculator</Heading>

      <Stack spacing={4} mt={4}>
        <Text fontSize="2xl">
          Your calculation&nbsp;
          <Tooltip />
        </Text>

        <Textarea value={inputValue} onChange={handleInputChange} />

        <Center>
          <Button onClick={resetInput}>Reset</Button>
        </Center>

        <OperationButtons appendToInput={appendToInput} />

        {(resultString || error) && (
          <Center>
            {resultString && (
              <VStack>
                <Text fontSize="5xl">{resultString}</Text>{' '}
                <Button onClick={copyResult}>Copy result</Button>
              </VStack>
            )}
            {error && (
              <Text color="red" fontSize="lg">
                {error}
              </Text>
            )}
          </Center>
        )}
      </Stack>
    </div>
  );
}

export default DurationCalculator;
