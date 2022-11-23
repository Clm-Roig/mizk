import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Link as ChakraLink,
  List,
  ListItem,
  StyleProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RefObject } from 'react';
import tools from '../data/tools';

const dividerStyle: StyleProps = {
  my: 4,
};
const toolTypeTextStyle: StyleProps = {
  fontSize: '1.2rem',
  fontWeight: '500',
  mb: 2,
  textTransform: 'uppercase',
};

const toolListItemStyle: StyleProps = {
  ml: 4,
  my: 2,
};

type Props = {
  btnRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
};

function SideMenu({ btnRef, isOpen, onClose }: Props) {
  const toolTypes = [...new Set(tools.map((t) => t.type))].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
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
          {toolTypes.map((type, idx) => (
            <Box key={type.name}>
              <Box {...toolTypeTextStyle}>
                <HStack>
                  <Icon as={type.icon} color="gray.400" />
                  <ChakraLink as={Link} to={type.url} onClick={onClose}>
                    {type.pluralName}
                  </ChakraLink>
                </HStack>
              </Box>
              <List>
                {tools
                  .filter((t) => t.type === type)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((tool) => (
                    <ListItem key={tool.name} {...toolListItemStyle}>
                      <ChakraLink as={Link} to={tool.url} onClick={onClose}>
                        {tool.menuName}
                      </ChakraLink>
                    </ListItem>
                  ))}
              </List>
              {idx !== toolTypes.length - 1 && <Divider {...dividerStyle} />}
            </Box>
          ))}
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
