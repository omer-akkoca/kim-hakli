import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { AuthProvider } from '@/src/providers';

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider mode="dark">
        <AuthProvider>
          <Box className="flex-1 items-center justify-center bg-background-0 px-6">
            <Text className="mb-4 text-typography-900">App.tsx</Text>
          </Box>
        </AuthProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
