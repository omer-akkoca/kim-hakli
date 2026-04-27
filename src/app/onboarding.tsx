import { useRouter } from 'expo-router';
import { View, FlatList, Image } from 'react-native';
import { height, STORAGE_KEYS, width } from '@/src/constants';
import { storage } from '@/src/utils';
import { Box, Button, ButtonText, HStack, Text } from '@/components/ui';
import { useRef, useState } from 'react';
import {
  ONBOARDING_FIVE,
  ONBOARDING_FOUR,
  ONBOARDING_ONE,
  ONBOARDING_THREE,
  ONBOARDING_TWO,
} from '@/assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function OnboardingPage() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const isLast = currentIndex === slides.length - 1;

  const goNext = () => {
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
  };

  const handleFinish = async () => {
    const result = await storage.set(STORAGE_KEYS.HAS_SEEN_ONBOARDING, true);
    if (result) {
      router.replace('/home');
    }
  };

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={{ width, height }} className="gap-6">
      <View style={{ flex: 3 }} className="overflow-hidden">
        <Image source={item.image} resizeMode="cover" style={{ width, height: (height / 3) * 2 }} />
      </View>
      <View style={{ flex: 1, paddingBottom: bottom + 24 }} className="px-6 gap-6">
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-3xl font-bold mb-3 capitalize">{t(item.title)}</Text>
          <Text className="text-center text-base leading-6 mb-6 w-3/4">{t(item.description)}</Text>
        </View>
        <View className="relative items-center justify-center">
          <HStack space="sm">
            {slides.map((_, i) => {
              const active = i === currentIndex;
              return (
                <Box
                  key={i}
                  className={`w-2 h-2 rounded-full ${active ? 'bg-primary-500' : 'bg-slate-500'}`}
                />
              );
            })}
          </HStack>
        </View>
        <Button
          onPress={isLast ? handleFinish : goNext}
          size="xl"
          className="w-full rounded-none shadow-md"
        >
          <ButtonText className="text-lg font-semibold">
            {isLast ? t('common.start') : t('common.continue')}
          </ButtonText>
        </Button>
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEnabled
      onMomentumScrollEnd={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      }}
    />
  );
}

const slides = [
  {
    id: '1',
    image: ONBOARDING_ONE,
    title: 'onboarding.slide1.title',
    description: 'onboarding.slide1.description',
  },
  {
    id: '2',
    image: ONBOARDING_TWO,
    title: 'onboarding.slide2.title',
    description: 'onboarding.slide2.description',
  },
  {
    id: '3',
    image: ONBOARDING_THREE,
    title: 'onboarding.slide3.title',
    description: 'onboarding.slide3.description',
  },
  {
    id: '4',
    image: ONBOARDING_FOUR,
    title: 'onboarding.slide4.title',
    description: 'onboarding.slide4.description',
  },
  {
    id: '5',
    image: ONBOARDING_FIVE,
    title: 'onboarding.slide5.title',
    description: 'onboarding.slide5.description',
  },
];
