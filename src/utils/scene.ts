export const getSceneImageUrl = (slug: string, order: string, lang: string) => {
  return `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}${slug}%2F-${order}-${lang}.png`;
};
