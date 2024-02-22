import { ReactNode, useRef } from 'react';
import { Box, Container, useDisclosure } from '@chakra-ui/react';

import { Helmet } from 'react-helmet';
import background from '../images/texture_yellow_blue_full.jpg';
import Breadcrumb from './Breadcrumb';
import Header from './Header';
import SideMenu from './SideMenu';
import ToolMetadata from '../pages/Tools/ToolMetadata';

type Props = {
  children: ReactNode;
};

function AppLayout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Metadata handling (default, then tool metadata) */}
      <Helmet titleTemplate="Mizk - %s" defaultTitle="Mizk">
        <meta charSet="UTF-8" />
        <meta name="description" content="All your tools in one place" />
      </Helmet>
      <ToolMetadata />

      <Box minHeight="100vh">
        <Box
          background={`url(${background})`}
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundAttachment="revert"
          height="100%"
          filter="blur(5px) brightness(200%) hue-rotate(120deg) contrast(60%)"
          opacity={0.06}
          position="absolute"
          top={0}
          transform="rotate(180deg)"
          width="100%"
          zIndex={-1}
        />
        <Header onOpenSideMenu={onOpen} />
        <Breadcrumb />
        <Container maxW="container.xl">
          <Box p={[2, 4]}>{children}</Box>
        </Container>
        <SideMenu btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default AppLayout;
