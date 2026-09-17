import React from 'react';
import {
  AppText,
  AppBackground,
  ProfileTab,
  CreditLabel,
  AppScrollView,
  ProfileLogoutButton,
  ProfileAvatar,
  AppCard,
  AppDivider,
} from '@/src/components';
import { Box, HStack, VStack } from '@/components/ui';
import { useGetUserStoryStats } from '@/src/actions';
import {
  AboutVector,
  AddFriendVector,
  BookmarkOutlineVector,
  HistoryVector,
  LockOutlineVector,
  MoonVector,
  ScalesVector,
  SettingsVector,
  SunVector,
  WatchVector,
} from '@/assets';
import { useRouter } from 'expo-router';
import { version } from '@/package.json';
import { useAuth, useRewardedAd, useTheme } from '@/src/hooks';
import { handleShareReferral } from '@/src/utils';

export default function ProfilePage() {
  const { theme, colors, toggleTheme } = useTheme();
  const { push } = useRouter();
  const { watchAndEarn } = useRewardedAd();

  const { user, isAuthenticated } = useAuth();

  const { data: stats } = useGetUserStoryStats(user?.id ?? '');

  if (!isAuthenticated) return <AppBackground />;

  return (
    <AppBackground>
      <AppScrollView safeTop topPadding bottomPadding>
        <Box className="items-center justify-center py-8 gap-6">
          <ProfileAvatar size={128} shadow borderWidth={2} borderColor={colors.primary} />
          <AppText size={26} lineHeight={32} weight={700} color="headline" className="-tracking-4">
            {user?.full_name ?? 'Kim Haklı Üyesi'}
          </AppText>
          <CreditLabel long />
        </Box>
        <VStack space="xl" className="px-6">
          {/* Statistics Card */}
          <HStack space="xl">
            <AppCard flex onPress={() => push('/unlocked_stories')}>
              <Box className="items-center justify-center p-4">
                <LockOutlineVector width={20} height={20} color={colors.primary} />
                <AppText
                  size={20}
                  lineHeight={24}
                  weight={600}
                  color="headline"
                  className="mt-2 mb-1"
                >
                  {stats?.unlocked_count ?? 0}
                </AppText>
                <AppText size={14} weight={500} color="headline_50">
                  Açılan Hikayeler
                </AppText>
              </Box>
            </AppCard>
            <AppCard flex onPress={() => push('/vote_history')}>
              <Box className="items-center justify-center p-4">
                <ScalesVector width={20} height={20} color={colors.primary} />
                <AppText
                  size={20}
                  lineHeight={24}
                  weight={600}
                  color="headline"
                  className="mt-2 mb-1"
                >
                  {stats?.voted_count ?? 0}
                </AppText>
                <AppText size={14} weight={500} color="headline_50">
                  Verilen Oylar
                </AppText>
              </Box>
            </AppCard>
          </HStack>
          {/* Buttons */}
          <AppCard>
            <VStack space="xs" className="px-4 py-1">
              <ProfileTab icon={WatchVector} label="İzle ve Kazan" onPress={watchAndEarn} />
              <AppDivider />
              <ProfileTab
                icon={AddFriendVector}
                label="Arkadaşını Davet Et"
                onPress={() => handleShareReferral(user?.referral_code, user?.full_name)}
              />
              <AppDivider />
              <ProfileTab
                icon={BookmarkOutlineVector}
                label="Kaydedilen Hikayeler"
                onPress={() => push('/bookmarks')}
              />
              <AppDivider />
              <ProfileTab
                icon={HistoryVector}
                label="Oy Geçmişim"
                onPress={() => push('/vote_history')}
              />
              <AppDivider />
              <ProfileTab
                icon={LockOutlineVector}
                label="Kilidi Açılan Hikayeler"
                onPress={() => push('/unlocked_stories')}
              />
              <AppDivider />
              <ProfileTab
                icon={theme === 'dark' ? SunVector : MoonVector}
                label={theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
                onPress={toggleTheme}
              />
              <AppDivider />
              <ProfileTab icon={SettingsVector} label="Ayarlar" onPress={() => push('/settings')} />
              {/*
                <Divider className="bg-white/20" />
                <ProfileTab icon={SupportVector} label="Destek" onPress={() => null} />
              */}

              <AppDivider />
              <ProfileTab icon={AboutVector} label="Hakkında" onPress={() => push('/about')} />
            </VStack>
          </AppCard>

          {/* Logout */}
          <ProfileLogoutButton />

          {/* Version */}
          <Box className="py-4">
            <AppText weight={600} color="headline_82" className="text-center">
              Kim Haklı?
            </AppText>
            <AppText size={12} weight={400} color="headline_78" className="text-center">
              v{version}
            </AppText>
          </Box>
        </VStack>
      </AppScrollView>
    </AppBackground>
  );
}
