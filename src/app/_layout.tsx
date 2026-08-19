import React, { type ComponentType, type PropsWithChildren, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@/components/ui';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AppStatusBar } from '@/src/components';
import { store } from '@/src/store';
import {
  AppInitializer,
  AuthProvider,
  ModalProvider,
  NotificationObserver,
  ToastProvider,
} from '@/src/providers';
import { AppNavigation } from '@/src/navigation';
import { queryClient } from '@/src/configs';
import '@/global.css';
import '@/src/locales/i18n';

type ProviderConfig = {
  component: ComponentType<any>;
  props?: Record<string, unknown>;
};

const providersConfig: ProviderConfig[] = [
  { component: Provider, props: { store } },
  { component: QueryClientProvider, props: { client: queryClient } },
  { component: GluestackUIProvider },
  { component: ModalProvider },
  { component: ToastProvider },
  { component: AuthProvider },
  { component: AppInitializer },
  { component: NotificationObserver },
];

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return providersConfig.reduceRight<ReactNode>(
    (content, { component: Component, props = {} }) => <Component {...props}>{content}</Component>,
    children,
  );
};

const RootLayout = () => {
  return (
    <Box className="flex-1 bg-background-500">
      <AppStatusBar />
      <AppProviders>
        <AppNavigation />
      </AppProviders>
    </Box>
  );
};

export default RootLayout;
