import { AppBar } from '@/src/components';
import { View, Text } from 'react-native';

const HomePage = () => {
  return (
    <View className="flex-1 bg-background-500">
      <AppBar title="Kim Haklı?" creditLabel />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Ana Sayfa</Text>
      </View>
    </View>
  );
};

export default HomePage;
