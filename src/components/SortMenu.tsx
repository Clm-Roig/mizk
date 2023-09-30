import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from '@chakra-ui/react';
import { FaSortAmountDown } from 'react-icons/fa';

import { ReactElement } from 'react';

export type SortType = {
  icon?: ReactElement;
  id: string;
  name: string;
};

type Props = {
  onChangeSortType: (sortType: SortType) => void;
  selectedSortType: SortType;
  sortTypes: SortType[];
} & Omit<MenuProps, 'children'>;

function SortMenu({
  onChangeSortType,
  selectedSortType,
  sortTypes,
  ...props
}: Props) {
  const handleOnSortTypeClick = (sortType: SortType) => {
    onChangeSortType(sortType);
  };
  return (
    // Using a Box here just to fix a dev warning
    // See: https://github.com/chakra-ui/chakra-ui/issues/3440#issuecomment-851707911
    <Box>
      <Menu {...props}>
        <MenuButton
          as={IconButton}
          icon={<FaSortAmountDown />}
          aria-label="Options"
          variant="outline"
        />
        <MenuList>
          {sortTypes.map((sortTypeOption) => (
            <MenuItem
              key={sortTypeOption.id}
              icon={sortTypeOption.icon}
              onClick={() => handleOnSortTypeClick(sortTypeOption)}
              command={sortTypeOption.id === selectedSortType.id ? '✓' : ''}
            >
              {sortTypeOption.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
export default SortMenu;
