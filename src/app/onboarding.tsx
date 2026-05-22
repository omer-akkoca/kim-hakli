import { useRef, useState } from 'react';
import { FlatList, Image } from 'react-native';
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
import { AppBackground, AppText, DetailPrimaryButton } from '@/src/components';
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

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <Box style={{ width, height }}>
      <AppBackground>
        <Box style={{ flex: 3 }} className="overflow-hidden">
          <Image
            source={item.image}
            resizeMode="cover"
            style={{ width, height: (height / 3) * 2 }}
          />
        </Box>
        <Box
          className="flex-1 px-6 gap-6"
          style={{ paddingBottom: bottom + 24, paddingHorizontal: 24 }}
        >
          <VStack space="lg" className="flex-1 justify-center items-center">
            <AppText
              size={24}
              lineHeight={30}
              weight={700}
              className="text-center capitalize text-headline"
            >
              {item.title}
            </AppText>
            <AppText size={16} lineHeight={22} className="w-3/4 text-center text-whiteSmoke-500/75">
              {item.description}
            </AppText>
          </VStack>
          <HStack space="sm" className="justify-center items-center">
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
        </Box>
      </AppBackground>
    </Box>
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
