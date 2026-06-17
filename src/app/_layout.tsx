import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AppInitializer, AuthProvider, ModalProvider, ToastProvider } from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css';
import '@/src/locales/i18n';
import { Box } from '@/components/ui';

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <Box className="flex-1 bg-background-500">
      <StatusBar translucent backgroundColor="transparent" animated barStyle={'light-content'} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider>
            <ModalProvider>
              <ToastProvider>
                <AuthProvider>
                  <AppInitializer>
                    <AppNavigation />
                  </AppInitializer>
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
