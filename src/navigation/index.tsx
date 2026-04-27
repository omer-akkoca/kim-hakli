import { Stack } from 'expo-router';

const AppNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="story/[id]" />
      <Stack.Screen name="story/read/[id]" />
      <Stack.Screen name="story/vote/[id]" />
      <Stack.Screen name="story/voteResult/[id]" />
    </Stack>
  );
};

export { AppNavigation };
