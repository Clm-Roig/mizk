import { Card, CardProps, useTheme } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface Props extends CardProps, PropsWithChildren {}

function MCard({ children, ...cardProps }: Props) {
  const {
    colors: { accent },
  } = useTheme();

  return (
    <Card
      _hover={{
        boxShadow: 'lg',
        outline: `2px solid ${accent[100]}`,
      }}
      outline="2px solid transparent"
      size="sm"
      transitionDuration="fast"
      {...cardProps}
    >
      {children}
    </Card>
  );
}

export default MCard;
