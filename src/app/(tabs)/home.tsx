import { AppBackground, AppBar } from '@/src/components';
import { View, Text } from 'react-native';

const HomePage = () => {
  return (
    <AppBackground>
      <AppBar title="Kim Haklı?" creditLabel />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Ana Sayfa</Text>
      </View>
    </AppBackground>
  );
};

export default HomePage;
