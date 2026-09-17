import React, { useMemo } from 'react';
import { Image } from 'expo-image';
import { LOGO } from '@/assets';
import { useAuth } from '@/src/hooks';
import { StyleSheet } from 'react-native';

interface ProfileAvatarProps {
  size: number;
  shadow?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size,
  shadow = false,
  borderWidth,
  borderColor,
}) => {
  const { user, profile_photo } = useAuth();

  const uri = useMemo(() => {
    if (profile_photo) return profile_photo;
    if (user?.avatar_url) return user.avatar_url;
  }, [user?.avatar_url, profile_photo]);

  return (
    <Image
      source={uri ? { uri } : LOGO}
      contentFit="cover"
      cachePolicy="memory-disk"
      transition={200}
      recyclingKey={user?.id ?? ''}
      style={[
        {
          width: size,
          height: size,
          borderWidth,
          borderColor,
          borderRadius: 999,
        },
        shadow ? styles.shadow : undefined,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#F1762A',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    // Android için
    elevation: 10,
  },
});

export { ProfileAvatar };
