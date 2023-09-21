import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Tool } from '../../models/Tool';
import { fuzzySearchTools } from './utils';

type Props = {
  tools: Tool[];
  setFoundTools: (tools: Tool[]) => void;
};

function ToolSearchBar({ tools, setFoundTools }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') {
      setFoundTools(tools);
    } else {
      setFoundTools(fuzzySearchTools(query, tools));
    }
  }, [query, setFoundTools, tools]);

  const handleInpuChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel>
        Search among <b>{tools.length}</b> tools
      </FormLabel>
      <Input size={['sm', 'md']} value={query} onChange={handleInpuChange} />
    </FormControl>
  );
}

export default ToolSearchBar;
