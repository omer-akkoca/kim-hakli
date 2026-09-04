import { Platform, Share } from 'react-native';

export const handleShareReferral = async (referralCode?: string) => {
  if (!referralCode) return;

  const inviteUrl = `https://kimhakli.tr/invite/${encodeURIComponent(referralCode)}`;

  await Share.share(
    Platform.OS === 'ios'
      ? {
          url: inviteUrl,
        }
      : {
          message: inviteUrl,
        },
  );
};
