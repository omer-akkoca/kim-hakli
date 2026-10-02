import React, { PropsWithChildren } from 'react';
import { Image } from 'expo-image';
import { SLIDER_FIVE, SLIDER_FOUR, SLIDER_ONE, SLIDER_THREE, SLIDER_TWO } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import { useGetAppConfig } from '@/src/actions';
import { AppText } from '../../ui';

const LeftSide: React.FC<PropsWithChildren> = ({ children }) => (
  <Box style={{ flex: 6 }} className="pl-4">
    {children}
  </Box>
);

const RightSide: React.FC<PropsWithChildren> = ({ children }) => (
  <Box style={{ flex: 4 }} className="pr-6 items-center justify-center">
    {children}
  </Box>
);

const PrimaryTitle: React.FC<{ title: string }> = ({ title }) => (
  <AppText
    color="primary"
    size={25}
    lineHeight={30}
    weight={800}
    numberOfLines={1}
    adjustsFontSizeToFit
    minimumFontScale={0.75}
  >
    {title}
  </AppText>
);

const NormalTitle: React.FC<{ title: string }> = ({ title }) => (
  <AppText
    color="headline"
    size={25}
    lineHeight={26}
    weight={800}
    numberOfLines={1}
    adjustsFontSizeToFit
    minimumFontScale={0.75}
  >
    {title}
  </AppText>
);

const SliderOne: React.FC = () => {
  const { data } = useGetAppConfig();
  return (
    <HStack space="sm" className="flex-1">
      <LeftSide>
        <VStack space="md" className="flex-1 justify-center">
          <VStack>
            <PrimaryTitle title="OY VER," />
            <NormalTitle title="PUAN KAZAN!" />
          </VStack>
          <VStack>
            <AppText color="headline" size={12} lineHeight={16} weight={500}>
              Her okuduğun ve oyladığın hikayelerde{' '}
              <AppText color="primary" size={12} lineHeight={16} weight={700}>
                +{data?.vote_prize}
              </AppText>{' '}
              puan kazanabilirsin.
            </AppText>
          </VStack>
        </VStack>
      </LeftSide>
      <RightSide>
        <Image source={SLIDER_ONE} style={{ width: '100%', height: '100%' }} contentFit="contain" />
      </RightSide>
    </HStack>
  );
};

const SliderTwo: React.FC = () => {
  return (
    <HStack space="sm" className="flex-1">
      <LeftSide>
        <VStack space="md" className="flex-1 justify-center">
          <VStack>
            <PrimaryTitle title="HAKLI TARAFI BUL," />
            <NormalTitle title="PUAN KAZAN!" />
          </VStack>
          <VStack>
            <AppText
              color="headline"
              size={12}
              lineHeight={16}
              weight={500}
              className="items-center"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              Her gün 22:00&apos;da sonlanan hikayelerde haklı tarafı bulup{' '}
              <AppText color="primary" size={12} lineHeight={16} weight={700}>
                oy sayısı kadar
              </AppText>{' '}
              puan kazanabilirsin.
            </AppText>
          </VStack>
        </VStack>
      </LeftSide>
      <RightSide>
        <Image source={SLIDER_TWO} style={{ width: '100%', height: '100%' }} contentFit="contain" />
      </RightSide>
    </HStack>
  );
};

const SliderThree: React.FC = () => {
  return (
    <HStack space="sm" className="flex-1">
      <LeftSide>
        <VStack space="md" className="flex-1 justify-center">
          <VStack>
            <PrimaryTitle title="ARKADAŞLARINI" />
            <NormalTitle title="DAVET ET!" />
          </VStack>
          <VStack>
            <AppText
              color="headline"
              size={12}
              lineHeight={16}
              weight={500}
              className="items-center"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              Kim Haklı? uygulamasına arkadaşlarını davet ederek{' '}
              <AppText color="primary" size={12} lineHeight={16} weight={700}>
                +100
              </AppText>{' '}
              puan kazanabilirsin.
            </AppText>
          </VStack>
        </VStack>
      </LeftSide>
      <RightSide>
        <Image
          source={SLIDER_THREE}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
        />
      </RightSide>
    </HStack>
  );
};

const SliderFour: React.FC = () => {
  return (
    <HStack space="sm" className="flex-1">
      <LeftSide>
        <VStack space="md" className="flex-1 justify-center">
          <VStack>
            <PrimaryTitle title="ARKADAŞIN" />
            <NormalTitle title="KAZANDIKÇA KAZAN!" />
          </VStack>
          <VStack>
            <AppText
              color="headline"
              size={12}
              lineHeight={16}
              weight={500}
              className="items-center"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              Davet ettiğin arkadaşının kazandığı puanın{' '}
              <AppText color="primary" size={12} lineHeight={16} weight={700}>
                %5
              </AppText>{' '}
              ’i, onun puanı eksilmeden sana eklenir.
            </AppText>
          </VStack>
        </VStack>
      </LeftSide>
      <RightSide>
        <Image
          source={SLIDER_FOUR}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
        />
      </RightSide>
    </HStack>
  );
};

const SliderFive: React.FC = () => {
  const { data } = useGetAppConfig();
  return (
    <HStack space="sm" className="flex-1">
      <LeftSide>
        <VStack space="md" className="flex-1 justify-center">
          <VStack>
            <PrimaryTitle title="İZLE," />
            <NormalTitle title="PUAN KAZAN!" />
          </VStack>
          <VStack>
            <AppText
              color="headline"
              size={12}
              lineHeight={16}
              weight={500}
              className="items-center"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              Her gün en fazla 10 reklam izleyerek, her reklam için{' '}
              <AppText color="primary" size={12} lineHeight={16} weight={700}>
                +{data?.ad_prize}
              </AppText>{' '}
              puan kazanabilirsin.
            </AppText>
          </VStack>
        </VStack>
      </LeftSide>
      <RightSide>
        <Image
          source={SLIDER_FIVE}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
        />
      </RightSide>
    </HStack>
  );
};

export { SliderOne, SliderTwo, SliderThree, SliderFour, SliderFive };
