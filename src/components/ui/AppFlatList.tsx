import React, { useMemo } from 'react';
import { FlatList, Platform, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/hooks';
import { AppText } from './AppText';

type AppFlatListOmittedProps =
  | 'refreshControl'
  | 'ListEmptyComponent'
  | 'showsVerticalScrollIndicator'
  | 'showsHorizontalScrollIndicator'
  | 'contentContainerStyle';

interface AppFlatListProps<T> extends Omit<
  React.ComponentProps<typeof FlatList<T>>,
  AppFlatListOmittedProps
> {
  noContentText?: string;
  loading?: boolean;
  onRefresh?: () => void;
  flatListRef?: React.Ref<FlatList<T>>;
  topPadding?: boolean;
  safeTop?: boolean;
  bottomPadding?: boolean;
  safeBottom?: boolean;
  paddingHorizontal?: number;
  gap?: number;
}

const AppFlatList = <T,>({
  noContentText,
  loading = false,
  onRefresh,
  flatListRef,
  topPadding,
  safeTop,
  bottomPadding,
  safeBottom,
  paddingHorizontal,
  gap,
  ...props
}: AppFlatListProps<T>) => {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

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

  const ListEmptyComponent = useMemo(() => {
    if (loading || !noContentText) return undefined;
    return (
      <AppText size={12} weight={600} color="headline_90" className="text-center">
        {noContentText}
      </AppText>
    );
  }, [loading, noContentText]);

  return (
    <FlatList<T>
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ paddingTop, paddingBottom, paddingHorizontal, gap }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={Platform.OS === 'android' ? colors.background : undefined}
            colors={[colors.primary]}
          />
        ) : undefined
      }
      {...props}
    />
  );
};

export { AppFlatList };
