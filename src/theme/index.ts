import { extendTheme } from '@chakra-ui/react';

import colors from './colors';
import fonts from './fonts';
import components from './components';
import styles from './styles';

const theme = extendTheme({
  colors,
  components,
  fonts,
  styles,
});

export default theme;
