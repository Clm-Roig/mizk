import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {
  onOpenSideMenu: () => void;
};

function Header({ onOpenSideMenu }: Props) {
  return (
    <Flex bg="primary.100" alignItems="center" p={2} h="64px">
      <IconButton
        aria-label="Open side menu"
        icon={<FaBars />}
        onClick={onOpenSideMenu}
      />

      <Flex alignItems="baseline">
        <Link to="/">
          <Text fontFamily="heading" fontSize="2xl" mx={2}>
            Mizk
          </Text>
        </Link>
        <Text>All your tools in one place</Text>
      </Flex>
    </Flex>
  );
}

export default Header;
