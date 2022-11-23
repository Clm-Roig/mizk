const headingTheme = {
  baseStyle: {
    fontWeight: 500,
  },
};

const buttonTheme = {
  baseStyle: {
    textTransform: 'uppercase',
  },
};

const linkTheme = {
  baseStyle: {
    color: 'primary.700',
    position: 'relative',
    _hover: {
      color: 'primary.500',
      textDecoration: 'none',
      _after: {
        transform: 'scaleX(1)',
      },
    },
    _after: {
      bg: 'primary.300',
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
};

const components = {
  Button: buttonTheme,
  Heading: headingTheme,
  Link: linkTheme,
};

export default components;
