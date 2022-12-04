import { Button, ButtonProps, useToast } from '@chakra-ui/react';

interface Props extends ButtonProps {
  successMessage?: string;
  valueToCopy: string | number;
}
function CopyButton({ successMessage, valueToCopy, ...buttonProps }: Props) {
  const disabled = typeof valueToCopy === 'string' ? valueToCopy === '' : false; // always enabled for number because a number can't be null

  const { children } = buttonProps;
  const toast = useToast();
  const copyContent = () => {
    if (valueToCopy) {
      navigator.clipboard.writeText(valueToCopy.toString());
      toast({
        title: successMessage || 'Content copied to your clipboard!',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      colorScheme="primary"
      zIndex={1}
      position="absolute"
      top={0}
      right={0}
      size="xs"
      fontSize="2xs"
      onClick={copyContent}
      disabled={disabled}
      {...buttonProps}
    >
      {children || 'Copy'}
    </Button>
  );
}

export default CopyButton;
