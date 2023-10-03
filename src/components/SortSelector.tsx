import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import useGameQueryStore from '../store';

const SortSelector = () => {
  const sortOrder = useGameQueryStore(state => state.gameQuery.sortOrder);
  const setSortOrder = useGameQueryStore(state => state.setSortOrder);

  const sortOrders = [
    {
      value: '',
      label: 'Relevance',
    },
    {
      value: '-added',
      label: 'Date Added',
    },
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: '-released',
      label: 'Release Date',
    },
    {
      value: '-metacritic',
      label: 'Popularity',
    },
    {
      value: '-rating',
      label: 'Average Rating',
    },
  ];
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order By:{' '}
        {sortOrders.find(sortOrderOption => sortOrderOption.value === sortOrder)
          ?.label || 'Relevance'}
      </MenuButton>
      <MenuList>
        {sortOrders.map(sortOrder => (
          <MenuItem
            onClick={() => setSortOrder(sortOrder.value)}
            key={sortOrder.value}
          >
            {sortOrder.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
