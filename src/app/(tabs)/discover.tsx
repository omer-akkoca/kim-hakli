import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Box, Pressable, HStack } from '@/components/ui';
import { GetStoriesParams, storyArtStyles } from '@/src/types';
import { FilterVector, SearchMagnifyingVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppBackground,
  AppBar,
  AppIconButton,
  AppLoading,
  AppText,
  StoryFilterDrawer,
  StoryRenderItem,
} from '@/src/components';
import { useTranslation } from 'react-i18next';
import { bottomBarHeight, colors } from '@/src/constants';
import { useRouter } from 'expo-router';
import { useGetStories } from '@/src/actions';

const DiscoverPage = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { bottom } = useSafeAreaInsets();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const [filters, setFilters] = useState<GetStoriesParams>({
    artStyle: 'all',
    categoryCode: undefined,
    creditFilter: 'all',
  });

  const { data: stories, isLoading } = useGetStories({
    artStyle: filters.artStyle,
    categoryCode: filters.categoryCode,
    creditFilter: filters.creditFilter,
  });

  return (
    <AppBackground>
      <AppBar
        creditLabel
        title="Keşfet"
        actions={[
          <AppIconButton
            key="search"
            icon={SearchMagnifyingVector}
            onPress={() => push('/search')}
            width={20}
            height={20}
            color={colors.headline}
          />,
        ]}
      >
        <HStack className="h-12 w-full items-center ">
          <HStack className="flex-1 h-full">
            <ScrollView
              horizontal
              className="h-full"
              contentContainerClassName="gap-4"
              contentContainerStyle={{ paddingLeft: 24 }}
              showsHorizontalScrollIndicator={false}
            >
              {storyArtStyles.map((e, i) => {
                const active = e === filters.artStyle;
                return (
                  <Pressable
                    key={e}
                    onPress={() => setFilters({ ...filters, artStyle: e })}
                    className={`h-full items-center justify-center border-b px-3 ${active ? 'border-primary-500' : 'border-transparent'}`}
                  >
                    <AppText
                      size={14}
                      lineHeight={16}
                      weight={active ? 500 : 400}
                      className={`${active ? 'text-primary-500' : 'text-loginText'}`}
                    >
                      {t(`artStyles.${e}`)}
                    </AppText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </HStack>
          <AppIconButton
            icon={FilterVector}
            onPress={() => setShowDrawer(true)}
            width={20}
            height={20}
            color={colors.headline}
            className="ml-4"
            style={{ marginRight: 24 }}
          />
        </HStack>
      </AppBar>
      <Box className="w-full flex-1">
        <FlatList
          data={stories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <StoryRenderItem order={index} story={item} />}
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: bottom + bottomBarHeight + 24,
            paddingHorizontal: 24,
            gap: 8,
          }}
          contentContainerClassName="px-6"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isLoading ? (
              <AppLoading />
            ) : (
              <AppText size={12} weight={600} className="text-loginText text-center">
                Uygun kriterlere göre hikaye bulunamadı.
              </AppText>
            )
          }
        />
      </Box>
      <StoryFilterDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        filters={filters}
        setFilters={setFilters}
      />
    </AppBackground>
  );
};

export default DiscoverPage;
