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
  const listSpacing = 4;
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

        <DrawerBody>
          <Box>
            <SectionTitle listSpacing={listSpacing} isFirst>
              TOOLS
            </SectionTitle>
            <Tools listSpacing={listSpacing} onClose={onClose} />
          </Box>

          <Box mt={4}>
            <SectionTitle listSpacing={listSpacing}>PAGES</SectionTitle>
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
        </DrawerBody>

        <DrawerFooter justifyContent="center">
          © 2022 -&nbsp;
          <ChakraLink href="https://clm-roig.github.io" isExternal>
            Clément ROIG
          </ChakraLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SideMenu;
