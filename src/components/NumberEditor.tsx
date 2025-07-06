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
  hideCopyButton?: boolean;
}
function NumberEditor({
  label,
  formLabelProps,
  hideCopyButton,
  ...numberInputProps
}: Props) {
  const { value } = numberInputProps;
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel marginY={0} {...formLabelProps}>
        {label}
      </FormLabel>
      <NumberInput
        {...numberInputProps}
        allowMouseWheel
        value={Number.isNaN(value) ? '' : value}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {!hideCopyButton && (
        <Box position="absolute" top={2} right={8}>
          <CopyButton
            successMessage={`${label} value (${numberInputProps.value}) copied to your clipboard!`}
            valueToCopy={numberInputProps.value as string | number}
          />
        </Box>
      )}
    </FormControl>
  );
}
export default NumberEditor;
