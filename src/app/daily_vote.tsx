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
  AppPrimaryButton,
  AppText,
  StoryCountDown,
  StoryDetailBg,
} from '@/src/components';
import { useGetClosingStory } from '@/src/actions';
import { getCoverImageUrl } from '@/src/utils';
import { H, height } from '@/src/constants';
import { useAuth, useTheme } from '@/src/hooks';

const DailyVote = () => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { replace } = useRouter();
  const { user } = useAuth();

  const { data, isLoading } = useGetClosingStory(user?.id);

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
              <Box style={{ backgroundColor: colors.white_50 }} className="h-1.5 w-10 rounded-md" />
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
                color="title"
                className="text-center w-11/12 mx-auto -tracking-4"
              >
                {data.title}
              </AppText>

              <VStack space="md">
                {data.status === 'closing' ? (
                  <AppText
                    size={H(16)}
                    lineHeight={H(22)}
                    weight={600}
                    color="title"
                    className="text-center"
                  >
                    Oylama Kapanıyor
                  </AppText>
                ) : null}
                <StoryCountDown closed_at={data.closed_at} status={data.status}>
                  <AppCard className="w-full">
                    <VStack className="items-center p-4">
                      <AppText size={14} lineHeight={21} weight={600} color="primary">
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
                <AppText size={13} lineHeight={16} weight={500} color="title_75">
                  <AppText weight={700} size={14} lineHeight={16} color="title">
                    {data.vote_count}
                  </AppText>{' '}
                  kişi oy verdi
                </AppText>
              </HStack>
              <AppPrimaryButton
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
