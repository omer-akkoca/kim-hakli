import React from 'react';
import { FlatList } from 'react-native';
import { AppBackground, AppBar, AppLoading, AppText, UnlockedStoryItem } from '@/src/components';
import { Box } from '@/components/ui';
import { useGetUserUnlockedStories } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemSeparatorComponent = () => <Box className="h-6" />;

const UnlockedStories: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  const { data: unlockedStories, isLoading } = useGetUserUnlockedStories();

  return (
    <AppBackground>
      <AppBar backIcon title="Kilidi Açılan Hikayeler" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <FlatList
            data={unlockedStories}
            keyExtractor={(item) => item.story_id}
            renderItem={({ item }) => <UnlockedStoryItem item={item} />}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24 }}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={
              <AppText size={12} weight={600} className="text-loginText text-center">
                Henüz kilidi açılan bir hikayeniz bulunmamaktadır.
              </AppText>
            }
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default UnlockedStories;
