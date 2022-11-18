import { ReactNode, useRef } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import Header from './Header';
import SideMenu from './SideMenu';

type Props = {
  children: ReactNode;
};

function AppLayout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Header onOpenSideMenu={onOpen} />
      <Box p={4}>{children}</Box>
      <SideMenu btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default AppLayout;
