import { supabase } from '@/src/configs';

export const createSignedUrlMap = async (paths: string[]) => {
  if (!paths.length) {
    return new Map<string, string>();
  }

  const { data, error } = await supabase.storage
    .from('story-assets')
    .createSignedUrls(paths, 60 * 60);

  if (error) throw new Error(error.message || 'Signed URL oluşturulurken hata oluştu.');

  return new Map(data.map((item) => [item.path, item.signedUrl]));
};

export const attachSignedImageUrls = async <T extends { image_path: string }>(items: T[]) => {
  const signedUrlMap = await createSignedUrlMap(items.map((item) => item.image_path));

  return items.map((item) => ({
    ...item,
    image_url: signedUrlMap.get(item.image_path) ?? '',
  }));
};

export const attachSignedCoverUrls = async <T extends { cover_image_path: string | null }>(
  items: T[],
) => {
  const paths = items.map((item) => item.cover_image_path).filter(Boolean) as string[];

  const signedUrlMap = await createSignedUrlMap(paths);

  return items.map((item) => ({
    ...item,
    cover_image_url: item.cover_image_path ? (signedUrlMap.get(item.cover_image_path) ?? '') : '',
  }));
};