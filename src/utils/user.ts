import { Platform, Share } from 'react-native';

export const handleShareReferral = async (referralCode?: string, fullName?: string) => {
  if (!referralCode) return;

  const inviteUrl = `https://kimhakli.tr/invite/${encodeURIComponent(referralCode)}`;

  const inviteText = `${fullName ?? 'Bir arkadaşın'} seni Kim Haklı?’ya davet etti!`;

  await Share.share(
    Platform.OS === 'ios'
      ? {
          message: inviteText,
          url: inviteUrl,
        }
      : {
          message: `${inviteText}\n\n${inviteUrl}`,
        },
  );
};
