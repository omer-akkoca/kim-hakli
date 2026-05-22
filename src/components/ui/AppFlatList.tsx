import React, { useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { AppText } from './AppText';
import { colors } from '@/src/constants';

type AppFlatListOmittedProps =
  | 'refreshControl'
  | 'ListEmptyComponent'
  | 'showsVerticalScrollIndicator'
  | 'showsHorizontalScrollIndicator';

interface AppFlatListProps<T> extends Omit<
  React.ComponentProps<typeof FlatList<T>>,
  AppFlatListOmittedProps
> {
  noContentText?: string;
  loading?: boolean;
  onRefresh?: () => void;
  flatListRef?: React.Ref<FlatList<T>>;
}

const AppFlatList = <T,>({
  noContentText,
  loading = false,
  onRefresh,
  flatListRef,
  ...props
}: AppFlatListProps<T>) => {
  const ListEmptyComponent = useMemo(() => {
    if (loading || !noContentText) return undefined;
    return (
      <AppText size={12} weight={600} className="text-loginText text-center">
        {noContentText}
      </AppText>
    );
  }, [loading, noContentText]);

  return (
    <FlatList<T>
      ref={flatListRef}
      {...props}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={colors.backgroud}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    />
  );
};

export { AppFlatList };
