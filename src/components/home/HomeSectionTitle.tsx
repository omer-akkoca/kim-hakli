import React from 'react';
import { AppText } from '../ui/AppText';

interface HomeSectionTitleProps {
  title: string;
}

const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({ title }) => {
  return (
    <AppText
      size={12}
      lineHeight={20}
      weight={600}
      className="text-whiteSmoke-500/75 -tracking-2 mb-2"
      style={{ paddingHorizontal: 24 }}
    >
      {title}
    </AppText>
  );
};

export { HomeSectionTitle };
