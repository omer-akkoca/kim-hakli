import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import '@/global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GluestackUIProvider>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
