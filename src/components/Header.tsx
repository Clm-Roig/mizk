import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

type Props = {
  onOpenSideMenu: () => void;
};

function Header({ onOpenSideMenu }: Props) {
  return (
    <Flex bg="primary" alignItems="center" p={2} h="64px">
      <IconButton
        aria-label="Open side menu"
        icon={<FaBars />}
        onClick={onOpenSideMenu}
      />

      <Flex alignItems="baseline">
        <Text fontFamily="heading" fontSize="2xl" mx={2}>
          Mizk
        </Text>
        <Text>All your tools in one place</Text>
      </Flex>
    </Flex>
  );
}

export default Header;
