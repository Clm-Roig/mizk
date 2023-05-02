import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link as ChakraLink,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RefObject } from 'react';
import SectionTitle from './SectionTitle';
import Tools from './Tools';

type Props = {
  btnRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
};

function SideMenu({ btnRef, isOpen, onClose }: Props) {
  const listSpacing = 3;
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <ChakraLink as={Link} to="/" onClick={onClose}>
            Home
          </ChakraLink>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Box>
            <SectionTitle listSpacing={listSpacing} isFirst>
              TOOLS
            </SectionTitle>
            <Box m={2}>
              <Tools listSpacing={listSpacing} onClose={onClose} />
            </Box>
          </Box>

          <Box mt={4}>
            <SectionTitle listSpacing={listSpacing}>PAGES</SectionTitle>
            <Box m={2}>
              <List spacing={listSpacing}>
                <ListItem>
                  <ChakraLink as={Link} to="/" onClick={onClose}>
                    Home
                  </ChakraLink>
                </ListItem>
                <ListItem>
                  <ChakraLink as={Link} to="/about" onClick={onClose}>
                    About
                  </ChakraLink>
                </ListItem>
              </List>
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter justifyContent="center">
          © {new Date().getFullYear()} -&nbsp;
          <ChakraLink href="https://clm-roig.github.io" isExternal>
            Clément ROIG
          </ChakraLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SideMenu;
