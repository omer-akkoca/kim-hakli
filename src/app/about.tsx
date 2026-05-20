import React from 'react';
import { FlatList } from 'react-native';
import { AppBackground, AppBar, AppLoading, FaqItem } from '@/src/components';
import { Box } from '@/components/ui';
import { useGetFaqs } from '@/src/actions';

const AboutPage = () => {
  const { data: faqs, isLoading } = useGetFaqs();

  return (
    <AppBackground>
      <AppBar backIcon title="Hakkında" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <FlatList
            data={faqs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FaqItem item={item} />}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Box>
    </AppBackground>
  );
};

const ItemSeparatorComponent = () => <Box className="h-6" />;

export default AboutPage;
