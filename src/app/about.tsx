import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { AppBackground, AppBar, AppFlatList, AppLoading, FaqItem } from '@/src/components';
import { Box } from '@/components/ui';
import { useGetFaqs } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IFaq } from '../types';

const AboutPage = () => {
  const { bottom } = useSafeAreaInsets();

  const { data: faqs, isLoading } = useGetFaqs();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IFaq>) => <FaqItem item={item} />,
    [],
  );

  return (
    <AppBackground>
      <AppBar backIcon title="Hakkında" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={faqs}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24 }}
          />
        )}
      </Box>
    </AppBackground>
  );
};

const ItemSeparatorComponent = () => <Box className="h-6" />;

export default AboutPage;
