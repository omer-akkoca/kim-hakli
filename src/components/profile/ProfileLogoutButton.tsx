import React from 'react';
import { Box, HStack } from '@/components/ui';
import { useSignOut } from '@/src/actions';
import { useModal } from '@/src/hooks';
import { AppLoading } from '../ui/AppLoading';
import { LogoutVector, RightChevronVector } from '@/assets';
import { AppText } from '../ui/AppText';
import { colors } from '@/src/constants';
import { AppCard } from '../ui/AppCard';

const ProfileLogoutButton = () => {
  const { show } = useModal();

  const { mutate: logout, isPending } = useSignOut();

  const handleLogout = () => {
    show({
      title: 'Çıkış Yap',
      subtitle: 'Çıkış yapmak istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet, Çıkış Yap',
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
            <AppText size={14} weight={600} className="text-primary-500 -tracking-2">
              Çıkış Yap
            </AppText>
          </HStack>
          <RightChevronVector width={16} height={16} color={colors.whiteSmoke_32} />
        </HStack>
      )}
    </AppCard>
  );
};

export { ProfileLogoutButton };
