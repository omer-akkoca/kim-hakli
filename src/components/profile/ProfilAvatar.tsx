import React, { useMemo } from 'react';
import { Image } from 'expo-image';
import { LOGO } from '@/assets';
import { Box } from '@/components/ui';
import { useAuth } from '@/src/hooks';

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
    <Box
      className="rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        boxShadow: shadow ? '0 0 40px rgba(241,118,42,0.28)' : undefined,
        borderWidth,
        borderColor,
      }}
    >
      <Image
        source={uri ? { uri } : LOGO}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={user?.id ?? ''}
        style={{ flex: 1 }}
      />
    </Box>
  );
};

export { ProfileAvatar };
