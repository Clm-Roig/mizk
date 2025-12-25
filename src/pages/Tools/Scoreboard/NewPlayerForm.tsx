import { FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

type Props = {
  isNewPlayerNameValid: (newPlayerName: string) => boolean;
  onAddPlayer: (newPlayerName: string) => void;
};

function NewPlayerForm({ isNewPlayerNameValid, onAddPlayer }: Props) {
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isNewPlayerNameValid(newPlayerName)) {
      onAddPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl isInvalid={!isNewPlayerNameValid(newPlayerName)}>
        <FormLabel>New player name</FormLabel>
        <HStack>
          <Input
            isInvalid={!isNewPlayerNameValid(newPlayerName)}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setNewPlayerName(e.currentTarget.value)
            }
            required
            value={newPlayerName}
          />

          {isNewPlayerNameValid(newPlayerName) && newPlayerName.trim() && (
            <Button type="submit" leftIcon={<FaPlus />}>
              Add player
            </Button>
          )}
        </HStack>
        {!isNewPlayerNameValid(newPlayerName) && (
          <FormErrorMessage>
            A player with this name already exists.
          </FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
}

export default NewPlayerForm;
