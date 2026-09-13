import React from 'react';
import { ScrollView } from 'react-native';
import { HStack, Pressable } from '@/components/ui';
import { GetStoriesParams, storyArtStyles } from '@/src/types';
import { AppText } from '../ui/AppText';
import { useTranslation } from 'react-i18next';

interface DiscoverFilterTabsProps {
  filters: GetStoriesParams;
  setFilters: React.Dispatch<React.SetStateAction<GetStoriesParams>>;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiscoverFilterTabs: React.FC<DiscoverFilterTabsProps> = ({ filters, setFilters }) => {
  const { t } = useTranslation();

  return (
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
    </HStack>
  );
};

export { DiscoverFilterTabs };
