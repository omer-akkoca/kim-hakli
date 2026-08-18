import { HStack, Pressable } from '@/components/ui';
import { leaderBoardPeriod } from '@/src/types';
import React from 'react';
import { AppText } from '../ui/AppText';
import { appBarHeight } from '@/src/constants';

interface TimeTabsProps {
  time: leaderBoardPeriod;
  setTime: (time: leaderBoardPeriod) => void;
}

const tabs: { key: leaderBoardPeriod; value: string }[] = [
  {
    key: 'all',
    value: 'Genel Sıralma',
  },
  {
    key: 'month',
    value: 'Aylık Sıralama',
  },
];

const TimeTabs: React.FC<TimeTabsProps> = ({ setTime, time }) => {
  return (
    <HStack className="w-full" style={{ height: appBarHeight }}>
      {tabs.map((e) => {
        const active = e.key === time;
        return (
          <Pressable
            key={e.key}
            onPress={() => setTime(e.key)}
            className={`flex-1 h-full items-center justify-center border-b px-3 ${active ? 'border-primary-500' : 'border-transparent'}`}
          >
            <AppText
              size={14}
              lineHeight={16}
              weight={active ? 500 : 400}
              className={`${active ? 'text-primary-500' : 'text-loginText'}`}
            >
              {e.value}
            </AppText>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export { TimeTabs };
