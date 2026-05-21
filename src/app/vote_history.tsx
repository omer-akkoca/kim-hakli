import React from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui';
import { AppBackground, AppBar, AppLoading, AppText, VoteHistoryCard } from '@/src/components';
import { useGeVoteHistory } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ItemSeparatorComponent = () => <Box className="h-6" />;

const VoteHistoryPage = () => {
  const { bottom } = useSafeAreaInsets();

  const { data, isLoading } = useGeVoteHistory();

  return (
    <AppBackground>
      <AppBar backIcon title="Oy Geçmişim" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(e) => e.story_id}
            renderItem={({ item }) => <VoteHistoryCard voteHistory={item} />}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom }}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={
              <AppText size={12} weight={600} className="text-loginText text-center">
                Henüz herhangi bir hikayeye oy vermediniz.
              </AppText>
            }
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default VoteHistoryPage;
