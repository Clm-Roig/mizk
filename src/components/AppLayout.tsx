import { ReactNode, useRef } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

import Breadcrumb from './Breadcrumb';
import Header from './Header';
import SideMenu from './SideMenu';

type Props = {
  children: ReactNode;
};

function AppLayout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box bgImage="#d5efff" minHeight="100vh">
      <Header onOpenSideMenu={onOpen} />
      <Breadcrumb />
      <Box p={4}>{children}</Box>
      <SideMenu btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AppLayout;
