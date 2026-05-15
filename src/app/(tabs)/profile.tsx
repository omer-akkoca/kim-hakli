import React from 'react';
import { ScrollView } from 'react-native';
import { useAppSelector } from '@/src/store';
import { Avatar, AvatarImage, Box, Divider, HStack, Pressable, VStack } from '@/components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSignOut } from '@/src/actions';
import { AppText, AppBackground, ProfileCard, ProfileTab } from '@/src/components';
import { Redirect } from 'expo-router';
import { CreditLabel } from '@/src/components/ui/CreditLabel';
import { bottomBarHeight, colors } from '@/src/constants';
import {
  AboutVector,
  BookmarkOutlineVector,
  HistoryVector,
  LockOutlineVector,
  LogoutVector,
  RightChevronVector,
  ScalesVector,
  SettingsVector,
  SupportVector,
} from '@/assets';

export default function ProfilePage() {
  const { top, bottom } = useSafeAreaInsets();

  const { user } = useAppSelector((state) => state.auth);

  const { mutate } = useSignOut();

  if (!user) return <Redirect href="/auth/login" />;

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={{ paddingTop: top, paddingBottom: bottomBarHeight + bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="items-center justify-center py-8 gap-6">
          <Avatar
            className="w-32 h-32 border-2 border-primary-500"
            style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)' }}
          >
            <AvatarImage source={{ uri: user.avatar_url }} />
          </Avatar>
          <AppText size={26} lineHeight={32} weight={700} className="text-headline -tracking-4">
            {user.full_name}
          </AppText>
          <CreditLabel />
        </Box>
        <VStack space="xl" className="px-6">
          {/* Statistics Card */}
          <HStack space="xl">
            <ProfileCard className="flex-1">
              <Box className="items-center justify-center p-4">
                <LockOutlineVector width={20} height={20} color={colors.primary} />
                <AppText size={20} lineHeight={24} weight={600} className="text-headline mt-2 mb-1">
                  28
                </AppText>
                <AppText size={14} weight={500} className="text-loginText/50">
                  Açılan Hikayeler
                </AppText>
              </Box>
            </ProfileCard>
            <ProfileCard className="flex-1">
              <Box className="items-center justify-center p-4">
                <ScalesVector width={20} height={20} color={colors.primary} />
                <AppText size={20} lineHeight={24} weight={600} className="text-headline mt-2 mb-1">
                  14
                </AppText>
                <AppText size={14} weight={500} className="text-loginText/50">
                  Verilen Oylar
                </AppText>
              </Box>
            </ProfileCard>
          </HStack>

          {/* Buttons */}
          <ProfileCard>
            <VStack space="xs" className="px-4 py-1">
              <ProfileTab
                icon={BookmarkOutlineVector}
                label="Kaydedilen Hikayeler"
                onPress={() => null}
              />
              <Divider className="bg-white/20" />
              <ProfileTab icon={HistoryVector} label="Oy Geçmişim" onPress={() => null} />
              <Divider className="bg-white/20" />
              <ProfileTab
                icon={LockOutlineVector}
                label="Kilidi Açılan Hikayeler"
                onPress={() => null}
              />
              <Divider className="bg-white/20" />
              <ProfileTab icon={SettingsVector} label="Ayarlar" onPress={() => null} />
              <Divider className="bg-white/20" />
              <ProfileTab icon={SupportVector} label="Destek" onPress={() => null} />
              <Divider className="bg-white/20" />
              <ProfileTab icon={AboutVector} label="Hakkında" onPress={() => null} />
            </VStack>
          </ProfileCard>

          {/* Logout */}
          <Pressable onPress={() => mutate()}>
            <ProfileCard>
              <HStack className="p-4 items-center justify-between">
                <HStack space="lg" className="items-center">
                  <LogoutVector width={20} height={20} color={colors.primary} />
                  <AppText size={14} weight={600} className="text-primary-500 -tracking-2">
                    Çıkış Yap
                  </AppText>
                </HStack>
                <RightChevronVector width={16} height={16} color={colors.whiteSmoke_32} />
              </HStack>
            </ProfileCard>
          </Pressable>
        </VStack>
      </ScrollView>
    </AppBackground>
  );
}
