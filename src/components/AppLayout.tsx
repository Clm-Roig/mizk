import { ReactNode, useRef } from 'react';
import { Box, Container, useDisclosure } from '@chakra-ui/react';

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
    <Box minHeight="100vh">
      <Header onOpenSideMenu={onOpen} />
      <Breadcrumb />
      <Container maxW="container.xl">
        <Box p={4}>{children}</Box>
      </Container>
      <SideMenu btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AppLayout;
