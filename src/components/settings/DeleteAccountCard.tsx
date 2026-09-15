import React from 'react';
import { DeleteVector, RightChevronVector } from '@/assets';
import { HStack } from '@/components/ui';
import { useModal, useTheme } from '@/src/hooks';
import { useDeleteAccount, useSignOut } from '@/src/actions';
import { AppText, AppCard, AppLoading } from '../ui';

const DeleteAccountCard = () => {
  const { show } = useModal();
  const { colors } = useTheme();

  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const { mutate: signOut } = useSignOut();

  const handleDeleteAccount = () => {
    show({
      title: 'Hesabı Sil',
      subtitle: 'Bu işlemi geri alamazsınız. Emin misiniz?',
      buttons: [
        {
          label: 'Evet, Sil',
          onPress() {
            deleteAccount(undefined, {
              onSuccess: (data) => {
                if (data.success) {
                  signOut();
                }
              },
            });
          },
        },
        {
          label: 'Vazgeç',
          variant: 'outline',
        },
      ],
    });
  };

  return (
    <AppCard onPress={handleDeleteAccount}>
      <HStack className="p-4 items-center justify-between">
        {isPending ? (
          <AppLoading fullScreen size={'small'} color={colors.error} />
        ) : (
          <>
            <HStack space="lg" className="items-center">
              <DeleteVector width={20} height={20} color={colors.delete} />
              <AppText size={14} weight={600} color="delete" className="-tracking-2">
                Hesabımı Sil
              </AppText>
            </HStack>
            <RightChevronVector width={16} height={16} color={colors.headline_32} />
          </>
        )}
      </HStack>
    </AppCard>
  );
};

export { DeleteAccountCard };
