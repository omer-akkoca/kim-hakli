import React from 'react';
import { TextInput } from 'react-native';
import { Box, HStack } from '@/components/ui';
import { CancelVector, SearchMagnifyingVector } from '@/assets';
import { useTheme } from '@/src/hooks';
import { AppIconButton } from '../ui/AppButtons';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  const { colors } = useTheme();
  return (
    <Box
      className="flex-1 rounded-full overflow-hidden"
      style={{
        height: 40,
        boxShadow: colors.shadow,
        backgroundColor: colors.background_75,
        borderWidth: 1.75,
        borderColor: colors.white_10,
      }}
    >
      <HStack space="md" className="flex-1 px-6 items-center">
        <SearchMagnifyingVector width={16} height={16} color={colors.headline} />
        <TextInput
          value={query}
          onChangeText={(text) => setQuery(text)}
          className="flex-1 text-ellipsis -tracking-2"
          style={{
            padding: 0,
            margin: 0,
            fontFamily: 'Inter-Medium',
            fontSize: 14,
            color: colors.headline,
          }}
          textAlignVertical="center"
          placeholder="Hikaye ara..."
          placeholderTextColor={colors.headline_78}
          autoFocus
          cursorColor={colors.primary}
          selectionColor={colors.primary}
        />
        {query ? (
          <AppIconButton
            icon={CancelVector}
            onPress={() => setQuery('')}
            color={'headline'}
            size={16}
          />
        ) : null}
      </HStack>
    </Box>
  );
};

export { SearchInput };
