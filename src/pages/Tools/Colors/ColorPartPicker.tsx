import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import CopyButton from '../../../components/CopyButton';

interface Props extends NumberInputProps {
  label: string;
}
function ColorPartPicker({ label, ...numberInputProps }: Props) {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel marginY={0}>{label}</FormLabel>
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
          valueToCopy={numberInputProps.value || 0}
        />
      </Box>
    </FormControl>
  );
}
export default ColorPartPicker;
