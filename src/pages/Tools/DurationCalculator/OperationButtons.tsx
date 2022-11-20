import {
  Button,
  ButtonGroup as ChakraButtonGroup,
  ButtonGroupProps,
  Wrap,
} from '@chakra-ui/react';
import SupportedOperations from './types';

type Props = {
  appendToInput: (value: string, operation: SupportedOperations) => void;
};

function ButtonGroup(props: ButtonGroupProps) {
  return <ChakraButtonGroup isAttached size={['sm', 'md']} {...props} />;
}

function OperationButtons({ appendToInput }: Props) {
  return (
    <Wrap justify="space-evenly">
      <ButtonGroup colorScheme="blue">
        <Button onClick={() => appendToInput('1day', SupportedOperations.ADD)}>
          +1 day
        </Button>
        <Button onClick={() => appendToInput('1h', SupportedOperations.ADD)}>
          +1 hour
        </Button>
        <Button onClick={() => appendToInput('1m', SupportedOperations.ADD)}>
          +1 min
        </Button>
        <Button onClick={() => appendToInput('1s', SupportedOperations.ADD)}>
          +1 second
        </Button>
      </ButtonGroup>

      <ButtonGroup colorScheme="red">
        <Button
          onClick={() => appendToInput('1day', SupportedOperations.SUBSTRACT)}
        >
          -1 day
        </Button>
        <Button
          onClick={() => appendToInput('1h', SupportedOperations.SUBSTRACT)}
        >
          -1 hour
        </Button>
        <Button
          onClick={() => appendToInput('1m', SupportedOperations.SUBSTRACT)}
        >
          -1 min
        </Button>
        <Button
          onClick={() => appendToInput('1s', SupportedOperations.SUBSTRACT)}
        >
          -1 second
        </Button>
      </ButtonGroup>
    </Wrap>
  );
}

export default OperationButtons;
