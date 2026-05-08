import React, { useState } from 'react';
import { FlatList, ImageBackground, ScrollView } from 'react-native';
import { Box, Pressable, HStack } from '@/components/ui';
import { GetStoriesParams, StoryArtStyle, storyArtStyles } from '@/src/types';
import { useStories } from '@/src/actions';

import { FilterVector, PAGE_BG, PAGE_BG2 } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppPage, AppText, StoryRenderItem } from '@/src/components';
import { useTranslation } from 'react-i18next';
import { colors } from '@/src/constants';

const StoriesPage = () => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const [showDrawer, setShowDrawer] = useState(false);
  const [artStyle, setArtStyle] = useState<StoryArtStyle>('all');

  const [appliedFilters, setAppliedFilters] = useState<GetStoriesParams>({
    artStyle: '',
    categoryIds: [],
  });

  const { data: stories, isLoading } = useStories(appliedFilters);

  return (
    <AppPage>
      <Box className="flex-1" style={{ paddingTop: top }}>
        {/* Filter */}
        <Box className="h-16 border-b border-white/5" style={{ paddingRight: 16 }}>
          <HStack className="h-full" style={{ gap: 16 }}>
            <ScrollView
              className="h-full flex-1"
              contentContainerClassName="gap-4 px-4"
              contentContainerStyle={{ paddingLeft: 16 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {storyArtStyles.map((e) => {
                const active = artStyle === e;
                return (
                  <Pressable
                    key={e}
                    onPress={() => setArtStyle(e)}
                    className={`h-full px-4 justify-center border-b ${active ? 'border-primary-500' : 'border-transparent'}`}
                  >
                    <AppText
                      size={15}
                      weight={500}
                      lineHeight={15}
                      className={`-tracking-widest ${active ? 'text-primary-500' : 'text-loginText'}`}
                    >
                      {t(`artStyles.${e}`)}
                    </AppText>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable className="h-full justify-center">
              <FilterVector width={24} height={24} color={colors.white} />
            </Pressable>
          </HStack>
        </Box>
        {/* Story List */}
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item, index }) => <StoryRenderItem story={item} order={index} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 8 }}
        />
      </Box>
    </AppPage>
  );
};

export default StoriesPage;
