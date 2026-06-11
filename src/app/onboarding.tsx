import { useCallback, useRef, useState } from 'react';
import { FlatList, Image, ListRenderItemInfo } from 'react-native';
import { Box, HStack, VStack } from '@/components/ui';
import {
  RightChevronVector,
  StarVector,
  ONBOARDING_FIVE,
  ONBOARDING_FOUR,
  ONBOARDING_ONE,
  ONBOARDING_THREE,
  ONBOARDING_TWO,
} from '@/assets';
import { AppBackground, AppFlatList, AppText, DetailPrimaryButton } from '@/src/components';
import { height, STORAGE_KEYS, width } from '@/src/constants';
import { storage } from '@/src/utils';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingPage() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

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

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<(typeof slides)[0]>) => (
      <Box style={{ width, height }}>
        <Box style={{ flex: 9 }} className="overflow-hidden">
          <Image
            source={item.image}
            resizeMode="cover"
            style={{ width, height: (height / 13) * 9 }}
          />
        </Box>
        <Box style={{ flex: 4, paddingBottom: 56 + 20 + 8 + bottom + 16 }}>
          <VStack space="lg" className="flex-1 w-full justify-center items-center px-6">
            <AppText
              size={24}
              lineHeight={30}
              weight={700}
              className="text-center capitalize text-headline"
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
            >
              {item.title}
            </AppText>
            <AppText
              size={16}
              lineHeight={22}
              className="w-3/4 text-center text-whiteSmoke-500/75"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
            >
              {item.description}
            </AppText>
          </VStack>
        </Box>
      </Box>
    ),
    [bottom],
  );

  return (
    <AppBackground>
      <Box className="flex-1 relative">
        <AppFlatList
          flatListRef={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          scrollEnabled
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          className="z-10"
        />
        <VStack
          space="xl"
          className="absolute w-full left-0 px-6 z-20"
          style={{ bottom: bottom + 16 }}
        >
          <HStack space="sm" className="justify-center items-center0">
            {slides.map((_, i) => {
              const active = i === currentIndex;
              return (
                <Box
                  key={i}
                  className={`w-2 h-2 rounded-full ${active ? 'bg-primary-500' : 'bg-secondary-500'}`}
                />
              );
            })}
          </HStack>
          <DetailPrimaryButton
            onPress={isLast ? handleFinish : goNext}
            label={isLast ? 'Başla' : 'Devam Et'}
            icon={isLast ? StarVector : RightChevronVector}
            reverse
          />
        </VStack>
      </Box>
    </AppBackground>
  );
}

const slides = [
  {
    id: '1',
    image: ONBOARDING_ONE,
    title: 'Her Hikayenin İki Tarafı Vardır',
    description: 'Gerçek hayattan tartışmaları kısa hikayeler olarak izle. Olaylara sen karar ver.',
  },
  {
    id: '2',
    image: ONBOARDING_TWO,
    title: 'Hikayeyi sahne sahne keşfet',
    description:
      'Tartışmalar, yapay zeka ile sahnelere ayrılır. Her detayı gör, durumu tam anlamıyla anla.',
  },
  {
    id: '3',
    image: ONBOARDING_THREE,
    title: 'Sence Kim Haklı?',
    description: 'Hikayenin sonunda kararını ver. Kendi fikrini ortaya koy.',
  },
  {
    id: '4',
    image: ONBOARDING_FOUR,
    title: 'Yalnız değilsin',
    description: 'Diğer kullanıcıların ne düşündüğünü gör. Çoğunluk seninle mi, yoksa karşı mı?',
  },
  {
    id: '5',
    image: ONBOARDING_FIVE,
    title: 'Giriş Yap',
    description:
      "Kim Haklı'ya kayıt olarak yüzlerce hikayeye erişim sağla ve kimin haklı olduğuna karar ver.",
  },
];
