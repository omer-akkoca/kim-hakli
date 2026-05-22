import React from 'react';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppLoading,
  UnlockedStoryItem,
} from '@/src/components';
import { useGetUserUnlockedStories } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemSeparatorComponent = () => <Box className="h-6" />;

const UnlockedStories: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  const { data: unlockedStories, isLoading, refetch } = useGetUserUnlockedStories();

  return (
    <AppBackground>
      <AppBar backIcon title="Kilidi Açılan Hikayeler" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={unlockedStories}
            keyExtractor={(item) => item.story_id}
            renderItem={({ item }) => <UnlockedStoryItem item={item} />}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24 }}
            ItemSeparatorComponent={ItemSeparatorComponent}
            noContentText="Henüz kilidi açılan bir hikayeniz bulunmamaktadır."
            refreshing={isLoading}
            onRefresh={refetch}
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default UnlockedStories;
