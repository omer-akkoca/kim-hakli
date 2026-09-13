import React, { useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { colors } from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppScrollViewProps extends React.ComponentProps<typeof ScrollView> {
  loading?: boolean;
  onRefresh?: () => void;
  topPadding?: boolean;
  safeTop?: boolean;
  bottomPadding?: boolean;
  safeBottom?: boolean;
  paddingHorizontal?: number;
  gap?: number;
}

const AppScrollView: React.FC<AppScrollViewProps> = ({
  loading = false,
  onRefresh,
  topPadding = false,
  safeTop,
  bottomPadding = false,
  safeBottom,
  paddingHorizontal,
  gap,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = useMemo(() => {
    let padding = 0;
    if (topPadding) padding += 24;
    if (safeTop) padding += top;
    return padding;
  }, [topPadding, safeTop, top]);

  const paddingBottom = useMemo(() => {
    let padding = 0;
    if (bottomPadding) padding += 24;
    if (safeBottom) padding += bottom;
    return padding;
  }, [bottomPadding, safeBottom, bottom]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        paddingHorizontal: paddingHorizontal ?? 0,
        gap: gap,
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={colors.backgroud}
            colors={[colors.primary]}
            progressViewOffset={top}
          />
        ) : undefined
      }
      {...props}
    />
  );
};

export { AppScrollView };
