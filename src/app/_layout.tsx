import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <AuthProvider>
            <AppNavigation />
          </AuthProvider>
        </GluestackUIProvider>
      </QueryClientProvider>
    </Provider>
  );
}
