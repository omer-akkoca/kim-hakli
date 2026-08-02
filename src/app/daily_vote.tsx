import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { RightChevronVector, UsersFillVector } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import { AppCard, AppText, DetailPrimaryButton, StoryDetailBg } from '@/src/components';
import { useGetClosingStory } from '@/src/actions';
import { getCoverImageUrl } from '@/src/utils';
import { colors, H } from '@/src/constants';
import { useCountdown } from '@/src/hooks';

const DailyVote = () => {
  const { bottom } = useSafeAreaInsets();
  const { push } = useRouter();

  const { data } = useGetClosingStory();

  const countdown = useCountdown(data?.closed_at);

  const countdownItems = countdown.isLessThan24Hours
    ? [
        { label: 'Saat', value: countdown.hours },
        { label: 'Dakika', value: countdown.minutes },
        { label: 'Saniye', value: countdown.seconds },
      ]
    : [
        { label: 'Gün', value: countdown.days },
        { label: 'Saat', value: countdown.hours },
        { label: 'Dakika', value: countdown.minutes },
      ];

  if (!data) return null;

  const coverImage = getCoverImageUrl(data.id);

  return (
    <StoryDetailBg coverImage={coverImage}>
      <Box className="flex-1" style={{ paddingBottom: bottom + 16 }}>
        <Box className="h-8 items-center justify-center">
          <Box className="h-1 w-9 rounded-md bg-white shadow-md" />
        </Box>
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
              {!countdown.isFinished ? (
                <AppText
                  size={H(16)}
                  lineHeight={H(22)}
                  weight={600}
                  className="text-headline text-center"
                >
                  Oylama Kapanıyor
                </AppText>
              ) : null}
              <HStack space="md" className="w-full">
                {countdown.isFinished ? (
                  <AppCard className="w-full">
                    <VStack className="items-center p-4">
                      <AppText size={14} lineHeight={21} weight={600} className="text-primary-500">
                        Süre Doldu
                      </AppText>
                    </VStack>
                  </AppCard>
                ) : (
                  countdownItems.map((item) => (
                    <AppCard key={item.label} className="flex-1">
                      <VStack space="md" className="items-center p-4">
                        <AppText
                          size={30}
                          weight={700}
                          lineHeight={38}
                          className="text-center text-primary-500"
                        >
                          {String(item.value).padStart(2, '0')}
                        </AppText>
                        <AppText
                          size={H(19)}
                          weight={500}
                          lineHeight={H(25)}
                          className="text-headline text-center"
                        >
                          {item.label}
                        </AppText>
                      </VStack>
                    </AppCard>
                  ))
                )}
              </HStack>
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
              <AppText size={12} lineHeight={16} weight={500} className="text-headline/75">
                <AppText weight={700} size={12} lineHeight={16} className="text-headline/75">
                  {data.vote_count}
                </AppText>{' '}
                ikişi oy verdi
              </AppText>
            </HStack>
            <DetailPrimaryButton
              icon={RightChevronVector}
              label="Hikayeyi Görüntüle"
              reverse
              onPress={() => push(`/story/${data.id}`)}
            />
          </VStack>
        </Box>
      </Box>
    </StoryDetailBg>
  );
};

export default DailyVote;
