import { Stack } from 'expo-router';
import { useAppSelector } from '../store';

const AppNavigation = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? <Stack.Screen name="auth/login" /> : null}
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="story/[id]" />
      <Stack.Screen name="story/read/[id]" />
      <Stack.Screen name="story/vote/[id]" />
      <Stack.Screen name="story/voteResult/[id]" />
    </Stack>
  );
};

export { AppNavigation };
