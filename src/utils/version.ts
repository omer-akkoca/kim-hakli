export const isVersionLower = (currentVersion: string, minimumVersion: string): boolean => {
  const currentParts = currentVersion.split('.').map(Number);
  const minimumParts = minimumVersion.split('.').map(Number);

  const maxLength = Math.max(currentParts.length, minimumParts.length);

  for (let index = 0; index < maxLength; index++) {
    const currentPart = currentParts[index] ?? 0;
    const minimumPart = minimumParts[index] ?? 0;

    if (currentPart < minimumPart) return true;
    if (currentPart > minimumPart) return false;
  }

  return false;
};

export const getMonthlyRewardUrl = (): string => {
  const currentMonthYear = new Date()
    .toLocaleDateString('en-GB', { month: '2-digit', year: 'numeric' })
    .replace('/', '-');
  return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/rewards/${currentMonthYear}.webp`;
};
