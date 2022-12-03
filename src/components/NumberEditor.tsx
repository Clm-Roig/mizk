import {
  Box,
  FormControl,
  FormLabel,
  FormLabelProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import CopyButton from './CopyButton';

interface Props extends NumberInputProps {
  label: string;
  formLabelProps?: FormLabelProps;
}
function NumberEditor({ label, formLabelProps, ...numberInputProps }: Props) {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel marginY={0} {...formLabelProps}>
        {label}
      </FormLabel>
      <NumberInput {...numberInputProps} allowMouseWheel>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Box position="absolute" top={2} right={8}>
        <CopyButton
          successMessage={`${label} value (${numberInputProps.value}) copied to your clipboard!`}
          valueToCopy={numberInputProps.value as string | number}
        />
      </Box>
    </FormControl>
  );
}
export default NumberEditor;
