import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { AiFillCloseCircle } from 'react-icons/ai';

function RemoveButton({ ...iconButtonProps }: IconButtonProps) {
  return (
    <IconButton
      rounded="50%"
      fontSize="2rem"
      position="absolute"
      right="-1rem"
      top="-1rem"
      variant="solid"
      colorScheme="red"
      icon={<AiFillCloseCircle />}
      {...iconButtonProps}
    />
  );
}

export default RemoveButton;
