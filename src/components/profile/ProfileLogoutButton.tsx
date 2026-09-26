import React from 'react';
import { LogoutVector, RightChevronVector } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { useSignOut } from '@/src/actions';
import { useModal, useTheme } from '@/src/hooks';
import { AppLoading, AppText, AppCard } from '../ui';

const ProfileLogoutButton = () => {
  const { show } = useModal();
  const { colors } = useTheme();

  const { mutate: logout, isPending } = useSignOut();

  const handleLogout = () => {
    show({
      title: 'Çıkış Yap',
      subtitle: 'Çıkış yapmak istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Çıkış Yap',
          onPress: logout,
        },
        {
          label: 'Vazgeç',
          variant: 'outline',
        },
      ],
    });
  };

  return (
    <AppCard onPress={handleLogout}>
      {isPending ? (
        <Box className="p-4">
          <AppLoading size="small" />
        </Box>
      ) : (
        <HStack className="p-4 items-center justify-between">
          <HStack space="lg" className="items-center">
            <LogoutVector width={20} height={20} color={colors.primary} />
            <AppText size={14} weight={600} color="primary" className="-tracking-2">
              Çıkış Yap
            </AppText>
          </HStack>
          <RightChevronVector width={16} height={16} color={colors.headline_32} />
        </HStack>
      )}
    </AppCard>
  );
};

export { ProfileLogoutButton };
