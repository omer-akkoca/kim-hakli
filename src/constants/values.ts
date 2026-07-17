import { Platform } from "react-native";

export const CREDIT_FILTERS = [
  {
    label: 'Tümü',
    value: 'all',
  },
  {
    label: 'Kredisiz',
    value: 'free',
  },
  {
    label: 'Kredili',
    value: 'paid',
  },
] as const;

export const referralList = [
  {
    label: 'TikTok',
    value: 'tiktok',
  },
  {
    label: 'Instagram',
    value: 'instagram',
  },
  {
    label: 'Facebook',
    value: 'facebook',
  },
  {
    label: 'X (Twitter)',
    value: 'twitter',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin',
  },
  {
    label: 'YouTube',
    value: 'youtube',
  },
  {
    label: 'Reddit',
    value: 'reddit',
  },
  {
    label: 'Eş, Dost ve Aile',
    value: 'friend_family',
  },
  {
    label: 'Diğer',
    value: 'other',
  },
];

export const STORE_URL =
  Platform.OS === 'android'
    ? 'https://play.google.com/store/apps/details?id=com.oakkoca.kimhakli'
    : 'https://apps.apple.com/tr/app/kim-haklı/id6784822130';