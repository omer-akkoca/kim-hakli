import React, { useMemo } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { useAuth } from '@/src/hooks';
import { PROFILE } from '@/assets';

const ProfileAvatar = () => {
  const { user } = useAuth();

  const source = useMemo(
    () => (user?.avatar_url ? { uri: user?.avatar_url } : PROFILE),
    [user?.avatar_url],
  );

  return (
    <Avatar
      className="w-32 h-32 border-2 border-primary-500"
      style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)' }}
    >
      <AvatarImage source={source} />
    </Avatar>
  );
};

export { ProfileAvatar };
