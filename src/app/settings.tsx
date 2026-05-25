import React from 'react';
import { Box, HStack } from '@/components/ui';
import { AppBackground, AppBar, AppCard, AppScrollView, AppText } from '@/src/components';
import { DeleteVector, RightChevronVector } from '@/assets';
import { colors } from '@/src/constants';
import { useDeleteAccount } from '@/src/actions';
import { useModal } from '@/src/hooks';

const SettingsPage = () => {
  const { show } = useModal();

  const { mutate: deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = () => {
    show({
      title: 'Hesabı Sil',
      subtitle: 'Bu işlemi geri alamazsınız. Emin misiniz?',
      buttons: [
        {
          label: 'Evet, Sil',
          onPress: deleteAccount,
        },
        {
          label: 'Vazgeç',
          variant: 'outline',
        },
      ],
    });
  };

  return (
    <AppBackground>
      <AppBar backIcon title="Ayarlar" />
      <Box className="flex-1">
        <AppScrollView safeBottom paddingHorizontal={24}>
          {/* Delete Account */}
          <AppCard onPress={handleDeleteAccount}>
            <HStack className="p-4 items-center justify-between">
              <HStack space="lg" className="items-center">
                <DeleteVector width={20} height={20} color={colors.delete} />
                <AppText size={14} weight={600} className="text-delete -tracking-2">
                  Hesabımı Sil
                </AppText>
              </HStack>
              <RightChevronVector width={16} height={16} color={colors.whiteSmoke_32} />
            </HStack>
          </AppCard>
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default SettingsPage;
