import React, { useMemo, useState } from 'react';
import {
  AppBackground,
  AppBar,
  AppCard,
  AppScrollView,
  AppText,
  DetailIconButton,
  DetailPrimaryButton,
  DetailSecondaryButton,
} from '@/src/components';
import { Avatar, AvatarImage, Box, Divider, VStack } from '@/components/ui';
import { TextInput } from 'react-native';
import { colors } from '../constants';
import { setUser, useAppDispatch, useAppSelector } from '../store';
import { DeleteVector, EditVector, LOGO, SaveVector } from '@/assets';
import { pickProfileImage } from '@/src/utils';
import { ImagePickerAsset } from 'expo-image-picker';
import { useToast } from '@/src/hooks';
import { useUpdateProfile } from '../actions';

const EditProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { show } = useToast();

  const { user, profile_photo } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.full_name ?? '');
  const [photo, setPhoto] = useState<ImagePickerAsset | undefined>();

  const uri = useMemo(() => {
    if (photo) return photo.uri;
    if (profile_photo) return profile_photo;
    if (user?.avatar_url) return user.avatar_url;
  }, [photo, user, profile_photo]);

  const { mutate, isPending } = useUpdateProfile();

  const handleSelectPhoto = async () => {
    try {
      const asset = await pickProfileImage();
      if (!asset) return;
      setPhoto(asset);
    } catch {
      show({
        title: 'Hata',
        description: 'Fotoğraf seçiminde bir hata meydana geldi.',
      });
    }
  };

  const handleReset = () => {
    setFullName(user?.full_name ?? '');
  };

  const handleSave = () => {
    mutate(
      { fullName, userId: user!.id, photo },
      {
        onSuccess: (data) => {
          dispatch(setUser(data));
          show({ title: 'Başarılı', description: 'Profiliniz güncellendi.' });
        },
        onError: (error) => {
          show({ type: 'error', title: 'Hata', description: error.message });
        },
      },
    );
  };

  return (
    <AppBackground>
      <AppBar backIcon title="Profili Düzenle" />
      <Box className="flex-1">
        <AppScrollView safeBottom bottomPadding topPadding paddingHorizontal={24}>
          <VStack space="2xl">
            <Box className="items-center justify-center">
              <Box className="relative">
                <Avatar className="w-32 h-32 border-2 border-primary-500 bg-transparent">
                  <AvatarImage source={uri ? { uri } : LOGO} />
                </Avatar>
                <Box className="absolute -right-3 -bottom-3">
                  <DetailIconButton icon={EditVector} onPress={handleSelectPhoto} />
                </Box>
              </Box>
            </Box>
            <VStack space="md">
              <AppText size={16} lineHeight={22} weight={600} className="text-headline -tracking-2">
                Ad Soyad
              </AppText>
              <AppCard>
                <TextInput
                  className="p-0 m-0 text-headline text-base px-4 py-3"
                  style={{ fontFamily: 'Inter-Medium' }}
                  placeholderTextColor={colors.whiteSmoke_50}
                  placeholder={'Ad ve Soyadınızı Giriniz...'}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </AppCard>
              <AppText size={12} lineHeight={16} className="text-headline/50 -tracking-2">
                Ad ve soyad bilgilerinizi güncelleyebilirsiniz.
              </AppText>
            </VStack>
            <Divider className="h-[1px] w-full bg-white/10" />
            <VStack space="lg">
              <DetailPrimaryButton
                icon={SaveVector}
                label="Kaydet"
                onPress={handleSave}
                disabled={fullName === ''}
                loading={isPending}
              />
              <DetailSecondaryButton icon={DeleteVector} label="İptal Et" onPress={handleReset} />
            </VStack>
          </VStack>
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default EditProfileScreen;
