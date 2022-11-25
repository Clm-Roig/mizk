import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isFirst?: boolean;
  listSpacing: number;
}

function SectionTitle({ children, isFirst, listSpacing }: Props) {
  const margin = isFirst ? { mb: listSpacing } : { my: listSpacing };
  return (
    <Text
      fontSize="2xl"
      color="white"
      bg="primary.600"
      textAlign="center"
      {...margin}
    >
      {children}
    </Text>
  );
}

export default SectionTitle;
