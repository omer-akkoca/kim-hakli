import React from 'react';
import { AppText } from '../ui';

interface HomeSectionTitleProps {
  title: string;
}

const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({ title }) => {
  return (
    <AppText
      size={14}
      lineHeight={22}
      weight={600}
      color="headline"
      className="-tracking-2 mb-2"
      style={{ paddingHorizontal: 24 }}
    >
      {title}
    </AppText>
  );
};

export { HomeSectionTitle };
