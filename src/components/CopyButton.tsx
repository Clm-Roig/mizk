import { Button, useToast } from '@chakra-ui/react';

interface Props {
  successMessage?: string;
  valueToCopy: string | number;
}
function CopyButton({ successMessage, valueToCopy }: Props) {
  const disabled = typeof valueToCopy === 'string' ? valueToCopy === '' : false; // always enabled for number because a number can't be null

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
      zIndex={1}
      position="absolute"
      top={0}
      right={0}
      size="xs"
      onClick={copyContent}
      disabled={disabled}
    >
      Copy
    </Button>
  );
}

export default CopyButton;
