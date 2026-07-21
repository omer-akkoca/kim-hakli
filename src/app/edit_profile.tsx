import React from 'react';
import { AppBackground, AppBar, AppScrollView, ProfileSettings } from '@/src/components';
import { Box } from '@/components/ui';

const EditProfileScreen = () => {
  return (
    <AppBackground>
      <AppBar backIcon title="Profili Düzenle" />
      <Box className="flex-1">
        <AppScrollView safeBottom bottomPadding topPadding paddingHorizontal={24}>
          <ProfileSettings />
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default EditProfileScreen;
