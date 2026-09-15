import React from 'react';
import { Box } from '@/components/ui';
import { timeAgo } from '@/src/utils';
import { useTheme } from '@/src/hooks';
import { AppText } from '../ui';

interface PublishedDateBadgeProps {
  created_at: string;
}

const PublishedDateBadge: React.FC<PublishedDateBadgeProps> = ({ created_at }) => {
  const { colors } = useTheme();
  return (
    <Box
      style={{ backgroundColor: colors.primary }}
      className="w-3/4 py-0.5 px-1 mx-auto rounded-md"
    >
      <AppText
        size={10}
        lineHeight={12}
        weight={600}
        color="title"
        className="text-center capitalize"
        numberOfLines={1}
      >
        {timeAgo(created_at)}
      </AppText>
    </Box>
  );
};

export { PublishedDateBadge };
