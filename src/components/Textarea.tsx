import {
  Box,
  Textarea as ChakraTextarea,
  TextareaProps,
} from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';
import CopyButton from './CopyButton';

interface Props extends TextareaProps {
  withCopyButton?: boolean;
}

const MIN_HEIGHT = 32;

function Textarea({ withCopyButton = true, ...textAreaProps }: Props) {
  const { value } = textAreaProps;
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      // Reset height - important to shrink on delete
      ref.current.style.height = 'inherit';
      ref.current.style.height = `${
        Math.max(ref.current.scrollHeight, MIN_HEIGHT) + 4 // add 4 to prevent scrollbar to appear
      }px`;
    }
  }, [value]);

  return (
    <Box position="relative">
      <ChakraTextarea
        ref={ref}
        {...textAreaProps}
        style={{ minHeight: MIN_HEIGHT, resize: 'none' }}
      >
        {textAreaProps.children}
      </ChakraTextarea>
      {withCopyButton && <CopyButton valueToCopy={ref?.current?.value || ''} />}
    </Box>
  );
}

export default Textarea;
