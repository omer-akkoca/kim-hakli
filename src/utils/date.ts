export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: 'yıl', seconds: 31536000 },
    { label: 'ay', seconds: 2592000 },
    { label: 'hafta', seconds: 604800 },
    { label: 'gün', seconds: 86400 },
    { label: 'saat', seconds: 3600 },
    { label: 'dakika', seconds: 60 },
    { label: 'saniye', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label} önce`;
    }
  }

  return 'Az önce';
};
