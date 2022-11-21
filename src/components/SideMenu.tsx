import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link as ChakraLink,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RefObject } from 'react';

type Props = {
  btnRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
};

function SideMenu({ btnRef, isOpen, onClose }: Props) {
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
          <Menu>
            <MenuGroup title="Calculators" />
            <MenuItem>
              <ChakraLink
                as={Link}
                to="/calculators/duration"
                onClick={onClose}
              >
                Duration
              </ChakraLink>
            </MenuItem>
            <MenuDivider />
            <MenuGroup title="Image">
              <ChakraLink as={Link} to="/images/converter" onClick={onClose}>
                <MenuItem disabled>Converter</MenuItem>
              </ChakraLink>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Encoders / Decoders">
              <ChakraLink
                as={Link}
                to="/encoders-decoders/base64"
                onClick={onClose}
              >
                <MenuItem disabled>Base64</MenuItem>
              </ChakraLink>
            </MenuGroup>
          </Menu>
        </DrawerBody>

        <DrawerFooter>
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
