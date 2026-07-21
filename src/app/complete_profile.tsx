import React from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui';
import { AppBackground, AppBar, AppScrollView, ProfileSettings } from '@/src/components';

const CompleteProfileScreen = () => {
  const { replace } = useRouter();

  const onSave = () => {
    replace('/');
  };

  return (
    <AppBackground>
      <AppBar title="Profilini Tamamla" />
      <Box className="flex-1">
        <AppScrollView safeBottom bottomPadding topPadding paddingHorizontal={24}>
          <ProfileSettings onSave={onSave} />
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default CompleteProfileScreen;
