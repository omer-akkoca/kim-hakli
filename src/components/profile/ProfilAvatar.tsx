import React, { useMemo } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { useAuth } from '@/src/hooks';
import { LOGO } from '@/assets';

const ProfileAvatar = () => {
  const { user, profile_photo } = useAuth();

  const uri = useMemo(() => {
    if (profile_photo) return profile_photo;
    if (user?.avatar_url) return user.avatar_url;
  }, [user?.avatar_url, profile_photo]);

  return (
    <Avatar
      className="w-32 h-32 border-2 border-primary-500 bg-transparent"
      style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)' }}
    >
      <AvatarImage source={uri ? { uri } : LOGO} />
    </Avatar>
  );
};

export { ProfileAvatar };
