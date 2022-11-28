import {
  Box,
  Textarea as ChakraTextarea,
  TextareaProps,
} from '@chakra-ui/react';
import { useRef } from 'react';
import CopyButton from './CopyButton';

interface Props extends TextareaProps {
  withCopyButton?: boolean;
}

function Textarea({ withCopyButton = true, ...textAreaProps }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <Box position="relative">
      <ChakraTextarea ref={textAreaRef} {...textAreaProps}>
        {textAreaProps.children}
      </ChakraTextarea>
      {withCopyButton && (
        <CopyButton valueToCopy={textAreaRef?.current?.value || ''} />
      )}
    </Box>
  );
}

export default Textarea;
