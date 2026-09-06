import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { RightChevronVector, UsersFillVector } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import {
  AppBackground,
  AppCard,
  AppLoading,
  AppText,
  DetailPrimaryButton,
  StoryCountDown,
  StoryDetailBg,
} from '@/src/components';
import { useGetClosingStory } from '@/src/actions';
import { getCoverImageUrl } from '@/src/utils';
import { colors, H, height } from '@/src/constants';

const DailyVote = () => {
  const { bottom } = useSafeAreaInsets();
  const { replace } = useRouter();

  const { data, isLoading } = useGetClosingStory();

  if (isLoading)
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );

  if (!data) return null;

  const coverImage = getCoverImageUrl(data.id);

  return (
    <Box style={{ height: height * 0.5 }}>
      <StoryDetailBg coverImage={coverImage}>
        <Box className="flex-1" style={{ paddingBottom: bottom + 16 }}>
          {Platform.OS === 'android' ? (
            <Box className="h-8 items-center justify-center">
              <Box className="h-1.5 w-10 rounded-md bg-white/50 shadow-md" />
            </Box>
          ) : null}
          <Box className="flex-1 justify-end px-6">
            <VStack space="2xl" className="flex-1 items-center justify-center">
              <AppText
                family="PlayfairDisplay"
                weight={600}
                size={H(32)}
                lineHeight={H(40)}
                numberOfLines={2}
                className="text-headline text-center w-11/12 mx-auto -tracking-4"
              >
                {data.title}
              </AppText>

              <VStack space="md">
                {data.status === 'closing' ? (
                  <AppText
                    size={H(16)}
                    lineHeight={H(22)}
                    weight={600}
                    className="text-headline text-center"
                  >
                    Oylama Kapanıyor
                  </AppText>
                ) : null}
                <StoryCountDown closed_at={data.closed_at} status={data.status}>
                  <AppCard className="w-full">
                    <VStack className="items-center p-4">
                      <AppText size={14} lineHeight={21} weight={600} className="text-primary-500">
                        Süre Doldu
                      </AppText>
                    </VStack>
                  </AppCard>
                </StoryCountDown>
              </VStack>
            </VStack>

            <VStack space="md">
              <HStack space="sm" className="items-center justify-center">
                <UsersFillVector
                  fill={colors.primary}
                  width={20}
                  height={20}
                  color={colors.primary}
                />
                <AppText size={13} lineHeight={16} weight={500} className="text-headline/75">
                  <AppText weight={700} size={14} lineHeight={16} className="text-headline">
                    {data.vote_count}
                  </AppText>{' '}
                  kişi oy verdi
                </AppText>
              </HStack>
              <DetailPrimaryButton
                icon={RightChevronVector}
                label="Hikayeyi Görüntüle"
                reverse
                onPress={() => replace(`/story/${data.id}`)}
              />
            </VStack>
          </Box>
        </Box>
      </StoryDetailBg>
    </Box>
  );
};

export default DailyVote;
