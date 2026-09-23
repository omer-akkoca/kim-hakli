import React from 'react';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import { NoInternetAnimation, WifiVector } from '@/assets';
import { VStack } from '@/components/ui';
import { W } from '@/src/constants';
import { AppBackground } from './AppBackground';
import { AppText } from './AppText';
import { AppPrimaryButton } from './AppButtons';
import { useToast } from '@/src/hooks';

interface AppNoInternetProps {
  setIsOnline: (online: boolean) => void;
}

const AppNoInternet: React.FC<AppNoInternetProps> = ({ setIsOnline }) => {
  const { show } = useToast();

  const handleRetryConnection = async () => {
    const state = await NetInfo.fetch();

    const online = state.isConnected === true && state.isInternetReachable !== false;

    setIsOnline(online);

    if (!online) {
      show({
        type: 'error',
        title: 'Bağlantı Bulunamadı',
        description: 'İnternet bağlantınızı kontrol edip tekrar deneyin.',
      });
    }
  };

  return (
    <AppBackground>
      <VStack space="xl" className="flex-1 w-full justify-center items-center px-6">
        <LottieView
          autoPlay
          loop={true}
          source={NoInternetAnimation}
          style={{ width: W(250), height: W(250) }}
        />
        <AppText color="headline" weight={600} className="text-center">
          Lütfen internet bağlantınızı kontrol ediniz.
        </AppText>
        <AppPrimaryButton
          icon={WifiVector}
          label="Tekrar Dene"
          onPress={handleRetryConnection}
          className="w-11/12"
        />
      </VStack>
    </AppBackground>
  );
};

export { AppNoInternet };
