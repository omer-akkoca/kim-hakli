import React from 'react';
import { useRouter } from 'expo-router';
import { ProfileOutlineVector, RightChevronVector } from '@/assets';
import { Box, HStack } from '@/components/ui';
import {
  AppBackground,
  AppBar,
  AppCard,
  AppScrollView,
  AppText,
  DeleteAccountCard,
} from '@/src/components';
import { useTheme } from '@/src/hooks';

const tabs = [
  {
    id: '1',
    icon: ProfileOutlineVector,
    label: 'Profili Düzenle',
    navigate: './edit_profile',
  },
];

const SettingsPage = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <AppBackground>
      <AppBar backIcon title="Ayarlar" />
      <Box className="flex-1">
        <AppScrollView topPadding bottomPadding safeBottom paddingHorizontal={24} gap={16}>
          {tabs.map((e, i) => (
            <AppCard key={e.id} onPress={() => router.push(e.navigate as any)}>
              <HStack className="p-4 items-center justify-between">
                <HStack space="lg" className="items-center">
                  <e.icon width={20} height={20} color={colors.headline} />
                  <AppText size={14} weight={600} color="headline" className="-tracking-2">
                    {e.label}
                  </AppText>
                </HStack>
                <RightChevronVector width={16} height={16} color={colors.headline_32} />
              </HStack>
            </AppCard>
          ))}

          <DeleteAccountCard />
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default SettingsPage;
