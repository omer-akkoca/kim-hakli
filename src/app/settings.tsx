import React from 'react';
import { Box } from '@/components/ui';
import { AppBackground, AppBar, AppScrollView, DeleteAccountCard } from '@/src/components';

const SettingsPage = () => {
  return (
    <AppBackground>
      <AppBar backIcon title="Ayarlar" />
      <Box className="flex-1">
        <AppScrollView topPadding bottomPadding safeBottom paddingHorizontal={24} gap={16}>
          <DeleteAccountCard />
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default SettingsPage;
