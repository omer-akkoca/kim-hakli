import React from 'react';
import { Provider } from 'react-redux';
import { Box } from '@/components/ui';
import { AppStatusBar } from '@/src/components';
import { store } from '@/src/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import {
  AppInitializer,
  AuthProvider,
  ModalProvider,
  ToastProvider,
  QueryProvider,
} from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css';
import '@/src/locales/i18n';

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <Box className="flex-1 bg-background-500">
      <AppStatusBar />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider>
            <ModalProvider>
              <ToastProvider>
                <AuthProvider>
                  <QueryProvider>
                    <AppInitializer>
                      <AppNavigation />
                    </AppInitializer>
                  </QueryProvider>
                </AuthProvider>
              </ToastProvider>
            </ModalProvider>
          </GluestackUIProvider>
        </QueryClientProvider>
      </Provider>
    </Box>
  );
};

export default RootLayout;
