import React, { useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import { DeleteVector, EditVector, LOGO, SaveVector } from '@/assets';
import { Avatar, AvatarImage, Box, Divider, HStack, VStack } from '@/components/ui';
import { genderType } from '@/src/types';
import { useUpdateProfile } from '@/src/actions';
import { pickProfileImage } from '@/src/utils';
import { useToast } from '@/src/hooks';
import { DetailIconButton, DetailPrimaryButton, DetailSecondaryButton } from '../story';
import { AppText } from '../ui/AppText';
import { AppCard } from '../ui/AppCard';
import { setUser, useAppDispatch, useAppSelector } from '@/src/store';
import { colors } from '@/src/constants';

interface ProfileSettingsProps {
  onSave?: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onSave }) => {
  const dispatch = useAppDispatch();
  const { show } = useToast();

  const { user, profile_photo } = useAppSelector((state) => state.auth);

  const [photo, setPhoto] = useState<ImagePickerAsset | undefined>();
  const [fullName, setFullName] = useState(user?.full_name ?? '');
  const [gender, setGender] = useState<genderType>(user?.gender);

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
    setPhoto(undefined);
    setGender(user?.gender);
  };

  const handleSave = () => {
    mutate(
      { fullName, userId: user!.id, photo, gender },
      {
        onSuccess: (data) => {
          dispatch(setUser(data));
          show({ title: 'Başarılı', description: 'Profiliniz güncellendi.' });
          if (onSave) {
            onSave();
          }
        },
        onError: (error) => {
          show({ type: 'error', title: 'Hata', description: error.message });
        },
      },
    );
  };

  return (
    <VStack space="2xl">
      <Box className="items-center justify-center">
        <Box className="relative">
          <Avatar className="w-40 h-40 border-2 border-primary-500 bg-transparent">
            <AvatarImage source={uri ? { uri } : LOGO} />
          </Avatar>
          <Box className="absolute -right-1 -bottom-1">
            <DetailIconButton icon={EditVector} onPress={handleSelectPhoto} />
          </Box>
        </Box>
      </Box>
      <VStack space="md">
        <AppText size={16} lineHeight={22} weight={600} className="text-headline -tracking-2">
          Kullanıcı Adı
        </AppText>
        <AppCard>
          <TextInput
            className="p-0 m-0 text-headline text-base px-4 py-3 bg-transparent"
            style={{ fontFamily: 'Inter-Medium', fontSize: 14, lineHeight: 20 }}
            placeholderTextColor={colors.whiteSmoke_50}
            placeholder={'Kullanıcı adınızı giriniz...'}
            value={fullName}
            onChangeText={setFullName}
          />
        </AppCard>
        <AppText size={12} lineHeight={16} className="text-headline/50 -tracking-2 mt-1">
          Kullanıcı adınız diğer kullanıcılar tarafından görülebilir. Lütfen sizi temsil eden bir
          kullanıcı adı seçiniz.
        </AppText>
      </VStack>
      <VStack space="md">
        <AppText size={16} lineHeight={22} weight={600} className="text-headline -tracking-2">
          Cinsiyet
        </AppText>
        <HStack space="md">
          <AppCard
            flex
            onPress={() => setGender('male')}
            className={`${gender === 'male' ? 'border-primary-500' : ''}`}
          >
            <Box className="py-3">
              <AppText
                className={`${gender === 'male' ? 'text-primary-500' : 'text-headline'} text-center text-base`}
              >
                Erkek
              </AppText>
            </Box>
          </AppCard>
          <AppCard
            flex
            onPress={() => setGender('female')}
            className={`${gender === 'female' ? 'border-primary-500' : ''}`}
          >
            <Box className="py-3">
              <AppText
                className={`${gender === 'female' ? 'text-primary-500' : 'text-headline'} text-center text-base`}
              >
                Kadın
              </AppText>
            </Box>
          </AppCard>
          <AppCard
            flex
            onPress={() => setGender('other')}
            className={`${gender === 'other' ? 'border-primary-500' : ''}`}
          >
            <Box className="py-3">
              <AppText
                className={`${gender === 'other' ? 'text-primary-500' : 'text-headline'} text-center text-base`}
              >
                Diğer
              </AppText>
            </Box>
          </AppCard>
        </HStack>
      </VStack>
      <Divider className="h-[1px] w-full bg-white/10" />
      <VStack space="lg">
        <DetailPrimaryButton
          icon={SaveVector}
          label="Kaydet"
          onPress={handleSave}
          disabled={!fullName || !gender}
          loading={isPending}
        />
        <DetailSecondaryButton icon={DeleteVector} label="İptal Et" onPress={handleReset} />
      </VStack>
    </VStack>
  );
};

export { ProfileSettings };
