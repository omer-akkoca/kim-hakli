import React, { useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { bottomBarHeight, colors } from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppScrollViewProps extends React.ComponentProps<typeof ScrollView> {
  loading?: boolean;
  onRefresh?: () => void;
  safeTop?: boolean;
  safeBottom?: boolean;
  safeBottomNav?: boolean;
  paddingHorizontal?: number;
  gap?: number;
}

const AppScrollView: React.FC<AppScrollViewProps> = ({
  loading = false,
  onRefresh,
  safeTop,
  safeBottom,
  safeBottomNav,
  paddingHorizontal,
  gap,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = useMemo(() => {
    if (safeTop) return top + 24;
    return 24;
  }, [safeTop]);

  const paddingBottom = useMemo(() => {
    if (safeBottom && safeBottomNav) return bottom + bottomBarHeight + 24;
    if (safeBottom) return bottom + 24;
    return 24;
  }, [safeBottom, safeBottomNav]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        paddingHorizontal: paddingHorizontal ?? 0,
        gap: gap,
      }}
      showsVerticalScrollIndicator={false}
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
