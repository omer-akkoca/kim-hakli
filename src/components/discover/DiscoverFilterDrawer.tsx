import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeleteVector, FilterVector } from '@/assets';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  HStack,
  VStack,
} from '@/components/ui';
import { CreditFilter, GetStoriesParams } from '@/src/types';
import { CREDIT_FILTERS } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useGetCategories } from '@/src/actions';
import { DiscoverFilterBadge } from './DiscoverFilterBadge';
import { AppBackground, AppPrimaryButton, AppSecondaryButton, AppScrollView, AppText } from '../ui';

interface DiscoverFilterDrawerProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
  filters: GetStoriesParams;
  setFilters: (filters: GetStoriesParams) => void;
}

const DiscoverFilterDrawer: React.FC<DiscoverFilterDrawerProps> = ({
  showDrawer,
  setShowDrawer,
  filters,
  setFilters,
}) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const { data: categories } = useGetCategories();

  const [categortyCode, setCategoryCode] = React.useState<string | undefined>(undefined);
  const [credit, setCredit] = React.useState<CreditFilter>('all');

  const handleClearFilter = () => {
    setCategoryCode(undefined);
    setCredit('all');
    setFilters({ ...filters, categoryCode: undefined, creditFilter: undefined });
    setShowDrawer(false);
  };

  return (
    <Drawer
      isOpen={showDrawer}
      size="lg"
      anchor="right"
      onClose={() => {
        setShowDrawer(false);
      }}
    >
      <DrawerBackdrop style={{ backgroundColor: colors.modalBackdrop }} />
      <DrawerContent style={{ borderColor: colors.headline_32 }} className="border-l p-0">
        <AppBackground>
          <DrawerBody className="flex-1">
            <AppScrollView gap={24} paddingHorizontal={16} safeTop>
              {/* Kategori Filtreleri */}
              <VStack space="lg">
                <AppText size={18} weight={600} color="headline" className="-tracking-2 px-2">
                  Kategoriler
                </AppText>
                <HStack space="sm" className="flex-wrap">
                  {categories?.map((e) => {
                    const active = categortyCode === e.code;
                    return (
                      <DiscoverFilterBadge
                        key={e.id}
                        label={e.name}
                        active={active}
                        onPress={() => setCategoryCode(active ? undefined : e.code)}
                      />
                    );
                  })}
                </HStack>
              </VStack>
              {/* Kredi Filtreleri */}
              <VStack space="lg">
                <AppText size={18} weight={600} color="headline" className="-tracking-2 px-2">
                  Kredi
                </AppText>
                <HStack space="sm" className="flex-wrap">
                  {CREDIT_FILTERS.map((e) => {
                    const active = credit === e.value;
                    return (
                      <DiscoverFilterBadge
                        key={e.value}
                        label={e.label}
                        active={active}
                        onPress={() => setCredit(active ? 'all' : e.value)}
                      />
                    );
                  })}
                </HStack>
              </VStack>
            </AppScrollView>
          </DrawerBody>
          <DrawerFooter style={{ paddingBottom: bottom }}>
            <VStack space="xl" className="w-full p-4">
              <AppPrimaryButton
                label="Uygula"
                onPress={() => {
                  setFilters({ ...filters, categoryCode: categortyCode, creditFilter: credit });
                  setShowDrawer(false);
                }}
                icon={FilterVector}
              />
              <AppSecondaryButton label="Temizle" onPress={handleClearFilter} icon={DeleteVector} />
            </VStack>
          </DrawerFooter>
        </AppBackground>
      </DrawerContent>
    </Drawer>
  );
};

export { DiscoverFilterDrawer };
