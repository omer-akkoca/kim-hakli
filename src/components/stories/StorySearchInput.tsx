import React from 'react';
import { CancelVector, SearchMagnifyingVector } from '@/assets';
import { Box, HStack, Pressable } from '@/components/ui';
import { colors } from '@/src/constants';
import { TextInput } from 'react-native';

interface IStorySearchInput {
  query: string;
  setQuery: (query: string) => void;
  setShowSearchInput: (show: boolean) => void;
}

const StorySearchInput: React.FC<IStorySearchInput> = ({ query, setQuery, setShowSearchInput }) => {
  const onClose = () => {
    setQuery('');
    setShowSearchInput(false);
  };

  return (
    <HStack space="md" className="bg-white px-4 h-12 rounded-md">
      <Box className="h-full justify-center">
        <SearchMagnifyingVector width={24} height={24} color={colors.backgroud} />
      </Box>
      <TextInput
        className="flex-1 p-0 text-text font-semibold"
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Arama..."
      />
      <Pressable onPress={onClose}>
        <Box className="h-full justify-center">
          <CancelVector width={24} height={24} color={colors.backgroud} />
        </Box>
      </Pressable>
    </HStack>
  );
};

export { StorySearchInput };
