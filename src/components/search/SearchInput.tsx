import React from 'react';
import { CancelVector, SearchMagnifyingVector } from '@/assets';
import { Box, HStack, LinearGradient } from '@/components/ui';
import { colors } from '@/src/constants';
import { BlurView } from 'expo-blur';
import { TextInput } from 'react-native';
import { AppIconButton } from '../ui/AppIconButton';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  return (
    <Box
      className="flex-1 bg-background-500 border border-white/10 rounded-full overflow-hidden"
      style={{ height: 46, boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
    >
      <LinearGradient
        colors={['rgba(124,144,164,0.06)', 'rgba(124,144,164,0)']}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <BlurView intensity={18} tint="dark" className="flex-1">
          <HStack space="md" className="flex-1 px-6 items-center">
            <SearchMagnifyingVector width={16} height={16} color={colors.headline} />
            <TextInput
              value={query}
              onChangeText={(text) => setQuery(text)}
              className="flex-1 text-headline text-ellipsis -tracking-2"
              style={{
                padding: 0,
                margin: 0,
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                lineHeight: 16,
              }}
              placeholder="Hikaye ara..."
              placeholderTextColor={colors.loginText}
              autoFocus
              cursorColor={colors.primary}
              selectionColor={colors.primary}
            />
            <AppIconButton
              icon={CancelVector}
              onPress={() => setQuery('')}
              color={colors.headline}
              width={16}
              height={16}
            />
          </HStack>
        </BlurView>
      </LinearGradient>
    </Box>
  );
};

export { SearchInput };
