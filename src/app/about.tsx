import React from 'react';
import { FlatList } from 'react-native';
import { AppBackground, AppBar, FaqItem } from '../components';
import { Box } from '@/components/ui';
import { useGetFaqs } from '../actions/faq';

const AboutPage = () => {
  const { data: faqs } = useGetFaqs();

  return (
    <AppBackground>
      <AppBar backIcon title="Hakkında" />
      <Box className="flex-1">
        <FlatList
          data={faqs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FaqItem item={item} />}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </AppBackground>
  );
};

const ItemSeparatorComponent = () => <Box className="h-6" />;

export default AboutPage;
