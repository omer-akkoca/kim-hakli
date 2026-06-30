import { Stack } from 'expo-router';

const AppNavigation = () => {
  return (
    <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="referral_source" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="story/[id]" />
      <Stack.Screen name="story/read/[id]" />
      <Stack.Screen name="story/vote/[id]" />
      <Stack.Screen name="story/voteResult/[id]" />
      <Stack.Screen name="search" />
      <Stack.Screen name="bookmarks" />
      <Stack.Screen name="vote_history" />
      <Stack.Screen name="unlocked_stories" />
      <Stack.Screen name="about" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="edit_profile" />
    </Stack>
  );
};

export { AppNavigation };
