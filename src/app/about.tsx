import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { AppBackground, AppBar, AppFlatList, AppLoading, FaqItem } from '@/src/components';
import { Box } from '@/components/ui';
import { useGetFaqs } from '@/src/actions';
import { IFaq } from '@/src/types';

const AboutPage = () => {
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
            topPadding
            paddingHorizontal={24}
            safeBottom
            bottomPadding
          />
        )}
      </Box>
    </AppBackground>
  );
};

const ItemSeparatorComponent = () => <Box className="h-6" />;

export default AboutPage;
