import { Stack } from 'expo-router';

const AppNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="story/[id]" />
      <Stack.Screen name="story/read/[id]" />
      <Stack.Screen name="auth/login" />
    </Stack>
  );
};

export { AppNavigation };
