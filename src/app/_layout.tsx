import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider, ModalProvider } from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css';
import '@/src/locales/i18n';
import { Box } from '@/components/ui';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Box className="flex-1 bg-background-500">
      <StatusBar translucent backgroundColor="transparent" animated barStyle={'light-content'} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider>
            <ModalProvider>
              <AuthProvider>
                <AppNavigation />
              </AuthProvider>
            </ModalProvider>
          </GluestackUIProvider>
        </QueryClientProvider>
      </Provider>
    </Box>
  );
}
