import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'expo-image';
import { ImagePickerAsset } from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteVector, EditVector, PasteVector, SaveVector } from '@/assets';
import { Box, Divider, HStack, VStack } from '@/components/ui';
import { genderType } from '@/src/types';
import { profileKeys, useCanApplyReferralCode, useUpdateProfile } from '@/src/actions';
import { pickProfileImage } from '@/src/utils';
import { clearRefCode, setUser, useAppDispatch, useAppSelector } from '@/src/store';
import { ProfileFormValues, profileSchema } from '@/src/schemas';
import { useAppState, useTheme, useToast } from '@/src/hooks';
import {
  AppText,
  AppCard,
  AppAlert,
  AppLoading,
  AppIconButton,
  AppPrimaryButton,
  AppSecondaryButton,
} from '../ui';
import { ProfileAvatar } from './ProfilAvatar';

interface ProfileSettingsProps {
  onSave?: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onSave }) => {
  const { colors } = useTheme();
  const { show } = useToast();
  const { refCode } = useAppState();
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { mutate, isPending } = useUpdateProfile();
  const { data: canApplyReferralCode = false, isLoading } = useCanApplyReferralCode(user?.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: user?.full_name ?? '',
      referralCode: refCode ?? '',
    },
  });

  const [photo, setPhoto] = useState<ImagePickerAsset | undefined>();
  const [gender, setGender] = useState<genderType>(user?.gender);

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

  const handlePasteRefCode = async () => {
    const copiedRefCode = await Clipboard.getStringAsync();
    if (copiedRefCode) {
      setValue('referralCode', copiedRefCode);
    }
  };

  const handleReset = () => {
    reset();
    setPhoto(undefined);
    setGender(user?.gender);
  };

  const handleSave = (data: ProfileFormValues) => {
    const { fullName, referralCode } = data;
    mutate(
      { fullName, referralCode, userId: user!.id, photo, gender },
      {
        onSuccess: (result) => {
          const updatedUser = result.user;
          const referral = result.referral;
          const hasReferralCode = Boolean(referralCode?.trim());

          dispatch(setUser(updatedUser));

          if (photo) {
            queryClient.invalidateQueries({
              queryKey: profileKeys.avatar(updatedUser.id, updatedUser.avatar_path),
            });
          }

          if (hasReferralCode && referral.success) {
            dispatch(clearRefCode());
            queryClient.invalidateQueries({
              queryKey: profileKeys.canApplyReferralCode(updatedUser.id),
            });
            show({
              type: 'success',
              title: 'Başarılı',
              description: 'Profiliniz güncellendi ve davet kodunuz başarıyla uygulandı.',
            });
          } else if (hasReferralCode) {
            dispatch(clearRefCode());
            show({
              type: 'error',
              title: 'Profil güncellendi',
              description: referral.reason ?? 'Davet kodu uygulanamadı.',
            });
          } else {
            show({
              type: 'success',
              title: 'Başarılı',
              description: 'Profiliniz güncellendi.',
            });
          }

          onSave?.();
        },
        onError: (error) => {
          show({ type: 'error', title: 'Hata', description: error.message });
        },
      },
    );
  };

  if (isLoading) return <AppLoading />;

  return (
    <VStack space="2xl">
      <Box className="items-center justify-center">
        <Box className="relative">
          {photo ? (
            <Image
              source={{ uri: photo.uri }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey={photo.assetId}
              style={{
                width: 140,
                height: 140,
                borderRadius: 140,
                borderColor: colors.primary,
                borderWidth: 1.75,
              }}
            />
          ) : (
            <ProfileAvatar size={140} borderColor={colors.primary} borderWidth={1.75} />
          )}
          <Box className="absolute -right-1 -bottom-1">
            <AppIconButton icon={EditVector} onPress={handleSelectPhoto} withBg color="title" />
          </Box>
        </Box>
      </Box>
      <VStack space="md">
        <AppText size={16} lineHeight={22} weight={600} color="headline" className="-tracking-2">
          Kullanıcı Adı
        </AppText>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <>
              <AppCard>
                <TextInput
                  className="p-4 m-0"
                  style={{ fontFamily: 'Inter-Medium', color: colors.headline }}
                  placeholderTextColor={colors.headline_50}
                  placeholder={'Kullanıcı adınızı giriniz...'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </AppCard>
              <AppAlert
                message={
                  error
                    ? error.message!
                    : 'Kullanıcı adınız diğer kullanıcılar tarafından görülebilir. Lütfen sizi temsil eden bir kullanıcı adı seçiniz.'
                }
                type={error ? 'error' : 'warning'}
              />
            </>
          )}
        />
      </VStack>
      <VStack space="md">
        <AppText size={16} lineHeight={22} weight={600} color="headline" className="-tracking-2">
          Cinsiyet
        </AppText>
        <HStack space="md">
          <AppCard
            flex
            onPress={() => setGender('male')}
            style={{
              borderWidth: 1.75,
              borderColor: gender === 'male' ? colors.primary : colors.transparent,
            }}
          >
            <Box className="py-3">
              <AppText
                weight={gender === 'male' ? 500 : 400}
                color={gender === 'male' ? 'primary' : 'headline'}
                className="text-center text-base"
              >
                Erkek
              </AppText>
            </Box>
          </AppCard>
          <AppCard
            flex
            onPress={() => setGender('female')}
            style={{
              borderWidth: 1.75,
              borderColor: gender === 'female' ? colors.primary : colors.transparent,
            }}
          >
            <Box className="py-3">
              <AppText
                weight={gender === 'female' ? 500 : 400}
                color={gender === 'female' ? 'primary' : 'headline'}
                className="text-center text-base"
              >
                Kadın
              </AppText>
            </Box>
          </AppCard>
          <AppCard
            flex
            onPress={() => setGender('other')}
            style={{
              borderWidth: 1.75,
              borderColor: gender === 'other' ? colors.primary : colors.transparent,
            }}
          >
            <Box className="py-3">
              <AppText
                weight={gender === 'other' ? 500 : 400}
                color={gender === 'other' ? 'primary' : 'headline'}
                className="text-center text-base"
              >
                Diğer
              </AppText>
            </Box>
          </AppCard>
        </HStack>
      </VStack>
      {canApplyReferralCode ? (
        <VStack space="md">
          <AppText size={16} lineHeight={22} weight={600} color="headline" className="-tracking-2">
            Referans Kodu
          </AppText>
          <Controller
            control={control}
            name="referralCode"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <AppCard>
                  <HStack className="flex-1 items-center justify-center px-4">
                    <TextInput
                      className="flex-1 px-0 py-4 m-0"
                      style={{ fontFamily: 'Inter-Medium', color: colors.headline }}
                      placeholderTextColor={colors.headline_50}
                      placeholder={'Referans kodunuzu giriniz...'}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    <AppIconButton
                      icon={PasteVector}
                      onPress={handlePasteRefCode}
                      color={'headline_50'}
                      size={20}
                    />
                  </HStack>
                </AppCard>
                <AppAlert
                  message={
                    error
                      ? error.message!
                      : 'Referans kodu, sizi davet eden kişinin size verdiği özel bir koddur. Eğer bir referans kodunuz yoksa bu alanı boş bırakabilirsiniz.'
                  }
                  type={error ? 'error' : 'warning'}
                />
              </>
            )}
          />
        </VStack>
      ) : null}

      <Divider className="h-[1px] w-full bg-white/10" />
      <VStack space="lg">
        <AppPrimaryButton
          icon={SaveVector}
          label="Kaydet"
          onPress={handleSubmit(handleSave)}
          disabled={!isValid || !gender || isPending || isSubmitting}
          loading={isPending || isSubmitting}
        />
        <AppSecondaryButton icon={DeleteVector} label="İptal Et" onPress={handleReset} />
      </VStack>
    </VStack>
  );
};

export { ProfileSettings };
