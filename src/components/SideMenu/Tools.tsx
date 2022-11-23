import {
  Box,
  Divider,
  HStack,
  Icon,
  Link as ChakraLink,
  List,
  ListItem,
  StyleProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import tools from '../../data/tools';

const toolTypeTextStyle: StyleProps = {
  fontSize: 'lg',
  fontWeight: '500',
  textTransform: 'uppercase',
};

const toolListItemStyle: StyleProps = {};

type Props = {
  listSpacing: number;
  onClose: () => void;
};

function Tools({ listSpacing, onClose }: Props) {
  const toolTypes = [...new Set(tools.map((t) => t.type))].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <>
      {toolTypes.map((type, idx) => (
        <Box key={type.name}>
          <Box {...toolTypeTextStyle} mb={listSpacing}>
            <HStack>
              <Icon as={type.icon} color="gray.400" />
              <ChakraLink as={Link} to={type.url} onClick={onClose}>
                {type.pluralName}
              </ChakraLink>
            </HStack>
          </Box>
          <List spacing={listSpacing}>
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
          {idx !== toolTypes.length - 1 && <Divider my={listSpacing} />}
        </Box>
      ))}
    </>
  );
}

export default Tools;
