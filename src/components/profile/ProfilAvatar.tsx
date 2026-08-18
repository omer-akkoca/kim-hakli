import React, { useMemo } from 'react';
import { Image } from 'expo-image';
import { LOGO } from '@/assets';
import { Box } from '@/components/ui';
import { useAuth } from '@/src/hooks';

const ProfileAvatar = () => {
  const { user, profile_photo } = useAuth();

  const uri = useMemo(() => {
    if (profile_photo) return profile_photo;
    if (user?.avatar_url) return user.avatar_url;
  }, [user?.avatar_url, profile_photo]);

  return (
    <Box
      className="w-32 h-32 border-2 border-primary-500 overflow-hidden rounded-full"
      style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)' }}
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
