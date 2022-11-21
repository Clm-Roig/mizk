import {
  Box,
  Button,
  Textarea as ChakraTextarea,
  TextareaProps,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Props extends TextareaProps {
  withCopyButton?: boolean;
}

function Textarea({ withCopyButton = true, ...textAreaProps }: Props) {
  const toast = useToast();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const copyContent = () => {
    if (textAreaRef && textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value);
      toast({
        title: 'Content copied to your clipboard!',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box position="relative">
      <ChakraTextarea ref={textAreaRef} {...textAreaProps}>
        {textAreaProps.children}
      </ChakraTextarea>
      {withCopyButton && (
        <Button
          zIndex={1}
          position="absolute"
          top={0}
          right={0}
          size="xs"
          onClick={copyContent}
        >
          Copy
        </Button>
      )}
    </Box>
  );
}

export default Textarea;
