import React from 'react';
import { AppBackground, AppBar, VoteHistoryCard } from '@/src/components';
import { Box } from '@/components/ui';
import { useGeVoteHistory } from '@/src/actions';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemSeparatorComponent = () => <Box className="h-6" />;

const VoteHistoryPage = () => {
  const { bottom } = useSafeAreaInsets();

  const { data } = useGeVoteHistory();

  return (
    <AppBackground>
      <AppBar backIcon title="Oy Geçmişim" />
      <Box className="flex-1">
        <FlatList
          data={data}
          keyExtractor={(e) => e.story_id}
          renderItem={({ item }) => <VoteHistoryCard voteHistory={item} />}
          contentContainerStyle={{ padding: 24, paddingBottom: bottom }}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </Box>
    </AppBackground>
  );
};

export default VoteHistoryPage;
