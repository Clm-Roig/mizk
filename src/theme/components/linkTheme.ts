import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    color: 'accent.700',
    position: 'relative',
    _hover: {
      color: 'accent.400',
      textDecoration: 'none',
      _after: {
        transform: 'scaleX(1)',
      },
    },
    _after: {
      bg: 'accent.200',
      bottom: 0,
      content: "''",
      height: '2px',
      left: 0,
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: 'transform ease-in-out',
      transitionDuration: 'fast',
      width: '100%',
    },
  },
});
