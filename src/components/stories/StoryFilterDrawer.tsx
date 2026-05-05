import {
  Button,
  ButtonText,
  Divider,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  HStack,
  Text,
} from '@/components/ui';
import { useCategories } from '@/src/actions';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StoryFilterBadge } from './StoryFilterBadge';
import { GetStoriesParams, ICategory, StoryArtStyle, storyArtStyles } from '@/src/types';
import { useTranslation } from 'react-i18next';

interface IStoryFilterDrawer {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
  appliedFilters: GetStoriesParams;
  setAppliedFilters: (filters: GetStoriesParams) => void;
}

const StoryFilterDrawer: React.FC<IStoryFilterDrawer> = ({
  showDrawer,
  setShowDrawer,
  appliedFilters,
  setAppliedFilters,
}) => {
  const { t } = useTranslation();

  const { data: categories } = useCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [artStyle, setArtStyle] = useState<StoryArtStyle | ''>('');

  const hasActiveFilter = appliedFilters.artStyle !== '' || appliedFilters.categoryIds.length > 0;

  const handleOnClickCategory = (category: ICategory) => {
    if (selectedCategories.includes(category.key)) {
      setSelectedCategories((last) => last.filter((key) => key !== category.key));
    } else {
      setSelectedCategories((last) => [...last, category.key]);
    }
  };

  const applyFilters = () => {
    setShowDrawer(false);
    setAppliedFilters({ categoryIds: selectedCategories, artStyle });
  };

  const clearFilter = () => {
    setShowDrawer(false);
    setAppliedFilters({ artStyle: '', categoryIds: [] });
    setArtStyle('');
    setSelectedCategories([]);
  };

  return (
    <Drawer
      isOpen={showDrawer}
      size="lg"
      anchor="right"
      onClose={() => {
        setShowDrawer(false);
      }}
    >
      <DrawerBackdrop />
      <DrawerContent className="bg-backgroud-500">
        <DrawerBody className="flex-1">
          <ScrollView contentContainerClassName="gap-6 mt-6">
            <View>
              <Text className="text-headline-500 text-lg font-bold mb-4">Kategori</Text>
              <HStack className="flex-wrap" space="md">
                {categories?.map((item, i) => {
                  const selected = selectedCategories.includes(item.key);
                  return (
                    <StoryFilterBadge
                      key={item.key}
                      label={item.name}
                      onPress={() => handleOnClickCategory(item)}
                      selected={selected}
                    />
                  );
                })}
              </HStack>
            </View>
            <Divider className="bg-lightGray" />
            <View>
              <Text className="text-headline-500 text-lg font-bold mb-4">Çizim Türü</Text>
              <HStack className="flex-wrap" space="md">
                {storyArtStyles.map((item, i) => {
                  const selected = item === artStyle;
                  return (
                    <StoryFilterBadge
                      key={item}
                      label={t(`artStyles.${item}`)}
                      onPress={() => setArtStyle((prev) => (prev === item ? '' : item))}
                      selected={selected}
                    />
                  );
                })}
              </HStack>
            </View>
          </ScrollView>
        </DrawerBody>
        <DrawerFooter className="py-4">
          <HStack space="lg">
            <Button onPress={applyFilters} className="flex-1 bg-primary-500">
              <ButtonText className="text-white font-semibold">Filtrele</ButtonText>
            </Button>
            {hasActiveFilter ? (
              <Button
                variant="outline"
                onPress={clearFilter}
                className="flex-1 border border-text-500"
              >
                <ButtonText className="text-text-500 font-semibold">Temizle</ButtonText>
              </Button>
            ) : null}
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { StoryFilterDrawer };
