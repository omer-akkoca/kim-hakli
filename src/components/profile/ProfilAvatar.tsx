import { Avatar, AvatarImage } from '@/components/ui';
import { useAuth } from '@/src/hooks';
import React from 'react';

const ProfileAvatar = () => {
  const { user } = useAuth();

  return (
    <Avatar
      className="w-32 h-32 border-2 border-primary-500"
      style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)' }}
    >
      <AvatarImage source={{ uri: user?.avatar_url }} />
    </Avatar>
  );
};

export { ProfileAvatar };
