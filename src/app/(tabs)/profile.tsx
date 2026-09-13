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
} from '@/src/components';
import { Box, Divider, HStack, VStack } from '@/components/ui';
import { useGetUserStoryStats } from '@/src/actions';
import { colors } from '@/src/constants';
import {
  AboutVector,
  AddFriendVector,
  BookmarkOutlineVector,
  HistoryVector,
  LockOutlineVector,
  ScalesVector,
  SettingsVector,
  WatchVector,
} from '@/assets';
import { useRouter } from 'expo-router';
import { version } from '@/package.json';
import { useAuth, useRewardedAd } from '@/src/hooks';
import { handleShareReferral } from '@/src/utils';

export default function ProfilePage() {
  const { push } = useRouter();
  const { watchAndEarn } = useRewardedAd();

  const { user, isAuthenticated } = useAuth();

  const { data: stats } = useGetUserStoryStats(user?.id ?? '');

  if (!isAuthenticated) return <AppBackground />;

  return (
    <AppBackground>
      <AppScrollView safeTop topPadding bottomPadding safeBottomNav safeBottom>
        <Box className="items-center justify-center py-8 gap-6">
          <ProfileAvatar size={128} shadow borderWidth={2} borderColor={colors.primary} />
          <AppText size={26} lineHeight={32} weight={700} className="text-headline -tracking-4">
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
                <AppText size={20} lineHeight={24} weight={600} className="text-headline mt-2 mb-1">
                  {stats?.unlocked_count ?? 0}
                </AppText>
                <AppText size={14} weight={500} className="text-loginText/50">
                  Açılan Hikayeler
                </AppText>
              </Box>
            </AppCard>
            <AppCard flex onPress={() => push('/vote_history')}>
              <Box className="items-center justify-center p-4">
                <ScalesVector width={20} height={20} color={colors.primary} />
                <AppText size={20} lineHeight={24} weight={600} className="text-headline mt-2 mb-1">
                  {stats?.voted_count ?? 0}
                </AppText>
                <AppText size={14} weight={500} className="text-loginText/50">
                  Verilen Oylar
                </AppText>
              </Box>
            </AppCard>
          </HStack>
          {/* Buttons */}
          <AppCard>
            <VStack space="xs" className="px-4 py-1">
              <ProfileTab icon={WatchVector} label="İzle ve Kazan" onPress={watchAndEarn} />
              <Divider className="bg-white/20" />
              <ProfileTab
                icon={AddFriendVector}
                label="Arkadaşını Davet Et"
                onPress={() => handleShareReferral(user?.referral_code)}
              />
              <Divider className="bg-white/20" />
              <ProfileTab
                icon={BookmarkOutlineVector}
                label="Kaydedilen Hikayeler"
                onPress={() => push('/bookmarks')}
              />
              <Divider className="bg-white/20" />
              <ProfileTab
                icon={HistoryVector}
                label="Oy Geçmişim"
                onPress={() => push('/vote_history')}
              />
              <Divider className="bg-white/20" />
              <ProfileTab
                icon={LockOutlineVector}
                label="Kilidi Açılan Hikayeler"
                onPress={() => push('/unlocked_stories')}
              />
              <Divider className="bg-white/20" />
              <ProfileTab icon={SettingsVector} label="Ayarlar" onPress={() => push('/settings')} />
              {/*
                <Divider className="bg-white/20" />
                <ProfileTab icon={SupportVector} label="Destek" onPress={() => null} />
              */}

              <Divider className="bg-white/20" />
              <ProfileTab icon={AboutVector} label="Hakkında" onPress={() => push('/about')} />
            </VStack>
          </AppCard>

          {/* Logout */}
          <ProfileLogoutButton />

          {/* Version */}
          <Box className="py-4">
            <AppText weight={600} className="text-center text-headline/80">
              Kim Haklı?
            </AppText>
            <AppText size={12} weight={400} className="text-center text-whiteSmoke-500/75">
              v{version}
            </AppText>
          </Box>
        </VStack>
      </AppScrollView>
    </AppBackground>
  );
}
