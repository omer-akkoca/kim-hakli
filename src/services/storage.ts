import { supabase } from '@/src/configs';
import { File } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { ILeaderBoardProfile, ILeaderBoardUser } from '../types';

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

export const uploadAvatar = async (
  userId: string,
  asset: ImagePicker.ImagePickerAsset,
): Promise<string> => {
  const extension = asset.fileName?.split('.').pop() || asset.mimeType?.split('/').pop() || 'jpg';

  const path = `${userId}/avatar.${extension}`;

  const file = new File(asset.uri);
  const base64 = await file.base64();

  const { error } = await supabase.storage.from('avatars').upload(path, decode(base64), {
    upsert: true,
    contentType: asset.mimeType ?? 'image/jpeg',
  });

  if (error) {
    throw new Error(error.message || 'Profil fotoğrafı yüklenemedi.');
  }

  return path;
};

export const mapLeaderBoardProfiles = async (
  users: ILeaderBoardUser[],
): Promise<ILeaderBoardProfile[]> => {
  return Promise.all(
    users.map(async (user) => {
      let avatar = user.avatar_url || null;

      if (user.avatar_path) {
        const { data } = await supabase.storage
          .from('avatars')
          .createSignedUrl(user.avatar_path, 60 * 60);

        avatar = data?.signedUrl || null;
      }

      return {
        id: user.id,
        full_name: user.full_name,
        credit_count: user.credit_count,
        avatar,
        order: user.order,
      };
    }),
  );
};