import React from 'react';
import { Box } from '@/components/ui';
import { AppBackground, AppBar, AppFlatList, AppLoading, VoteHistoryCard } from '@/src/components';
import { useGeVoteHistory } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemSeparatorComponent = () => <Box className="h-6" />;

const VoteHistoryPage = () => {
  const { bottom } = useSafeAreaInsets();

  const { data, isLoading, refetch } = useGeVoteHistory();

  return (
    <AppBackground>
      <AppBar backIcon title="Oy Geçmişim" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={data}
            keyExtractor={(e) => e.story_id}
            renderItem={({ item }) => <VoteHistoryCard voteHistory={item} />}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24 }}
            ItemSeparatorComponent={ItemSeparatorComponent}
            noContentText="Henüz herhangi bir hikayeye oy vermediniz."
            refreshing={isLoading}
            onRefresh={refetch}
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default VoteHistoryPage;
