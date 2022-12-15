import {
  Button,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Switch,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import Textarea from '../../../components/Textarea';

function StringReplacer() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [replaced, setReplaced] = useState('');
  const [replacer, setReplacer] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useBoolean(true);

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleReplacedChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReplaced(e.currentTarget.value);
  };

  const handleReplacerChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReplacer(e.currentTarget.value);
  };

  const removeSpaces = () => {
    setResultText(resultText.replaceAll(' ', ''));
  };

  const removeLineBreaks = () => {
    setResultText(resultText.replaceAll(/(\r\n|\n|\r)/gm, ''));
  };

  const computeResult = useCallback(() => {
    const newReplaced = isCaseSensitive ? replaced : replaced.toLowerCase();
    const regExpFlags = `g${isCaseSensitive ? '' : 'i'}`;
    const result = inputText.replaceAll(
      new RegExp(newReplaced, regExpFlags),
      replacer
    );
    setResultText(result);
  }, [inputText, isCaseSensitive, replaced, replacer]);

  const reset = () => {
    computeResult();
  };

  useEffect(() => {
    if (replaced === '') {
      // Handle when the user erase the replaced input
      setResultText('');
    } else {
      computeResult();
    }
  }, [computeResult, replaced]);

  return (
    <>
      <Heading as="h1">String replacer</Heading>

      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputText} onChange={handleInputChange} />
          <FormLabel htmlFor="is-case-sensitive">
            <Switch
              id="is-case-sensitive"
              isChecked={isCaseSensitive}
              onChange={setIsCaseSensitive.toggle}
              mr={2}
            />
            {`Case ${isCaseSensitive ? '' : 'in'}sensitive`}
          </FormLabel>
        </VStack>

        <HStack spacing={2} w="full" align="baseline">
          <VStack flex={1}>
            <Text fontSize="xl">Replaced</Text>
            <Input value={replaced} onChange={handleReplacedChange} />
          </VStack>
          <Text>by</Text>
          <VStack flex={1}>
            <Text fontSize="xl">Replacer</Text>
            <Input value={replacer} onChange={handleReplacerChange} />
          </VStack>
        </HStack>

        <Icon as={FaExchangeAlt} transform="rotateZ(90deg)" color="gray" />

        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Result</Text>
          {/* 
            isReadOnly attribute is not very user-friendly: you can't copy a part of the string for example.
            That's why it uses a dummy onChange function.
          */}
          <Textarea value={resultText} onChange={() => null} />
        </VStack>

        <Text fontSize="2xl">Post-processing</Text>
        <HStack wrap="wrap" gap={2} justifyContent="center">
          <Button
            size={['sm', 'md']}
            colorScheme="primary"
            onClick={removeSpaces}
          >
            Remove spaces
          </Button>
          <Button
            size={['sm', 'md']}
            colorScheme="primary"
            onClick={removeLineBreaks}
          >
            Remove line breaks
          </Button>
          <Button size={['sm', 'md']} onClick={reset}>
            Reset
          </Button>
        </HStack>
      </VStack>
    </>
  );
}

export default StringReplacer;
