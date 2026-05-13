import React, { PropsWithChildren } from 'react';
import { Box, LinearGradient } from '@/components/ui';
import { BlurView } from 'expo-blur';

interface ProfileCardProps extends PropsWithChildren {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className, children }) => {
  return (
    <Box
      className={`bg-background-500/75 rounded-xl border border-white/10 overflow-hidden disabled:opacity-50 ${className}`}
      style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.24)' }}
    >
      <BlurView intensity={18} tint="dark" className="flex-1">
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
          {children}
        </LinearGradient>
      </BlurView>
    </Box>
  );
};

export { ProfileCard };
