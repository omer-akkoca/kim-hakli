import React from 'react';
import { ScrollView } from 'react-native';
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
import { AppBackground } from '../ui/AppBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '@/src/store';
import { AppText } from '../ui/AppText';
import { DetailPrimaryButton, DetailSecondaryButton } from '../story';
import { DeleteVector, FilterVector } from '@/assets';
import { CREDIT_FILTERS } from '@/src/constants/values';
import { DiscoverFilterBadge } from './DiscoverFilterBadge';

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
  const { top, bottom } = useSafeAreaInsets();

  const categories = useAppSelector((state) => state.category.categories);

  const [categortyCode, setCategoryCode] = React.useState<string | undefined>(undefined);
  const [credit, setCredit] = React.useState<CreditFilter>('all');

  return (
    <Drawer
      isOpen={showDrawer}
      size="lg"
      anchor="right"
      onClose={() => {
        setShowDrawer(false);
      }}
    >
      <DrawerBackdrop className="bg-modal-backdrop" />
      <DrawerContent className="border-l border-whiteSmoke-500/25 p-0">
        <AppBackground>
          <DrawerBody className="flex-1" style={{ paddingTop: top }}>
            <ScrollView contentContainerClassName="p-4 gap-6" showsVerticalScrollIndicator={false}>
              {/* Kategori Filtreleri */}
              <VStack space="lg">
                <AppText size={18} weight={600} className="text-headline -tracking-2 px-2">
                  Kategoriler
                </AppText>
                <HStack space="sm" className="flex-wrap">
                  {categories.map((e) => {
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
                <AppText size={18} weight={600} className="text-headline -tracking-2 px-2">
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
            </ScrollView>
          </DrawerBody>
          <DrawerFooter style={{ paddingBottom: bottom }}>
            <VStack space="xl" className="w-full p-4">
              <DetailPrimaryButton
                label="Uygula"
                onPress={() => {
                  setFilters({ ...filters, categoryCode: categortyCode, creditFilter: credit });
                  setShowDrawer(false);
                }}
                icon={FilterVector}
              />
              <DetailSecondaryButton
                label="Temizle"
                onPress={() => {
                  setCategoryCode(undefined);
                  setFilters({ ...filters, categoryCode: undefined });
                  setShowDrawer(false);
                }}
                icon={DeleteVector}
              />
            </VStack>
          </DrawerFooter>
        </AppBackground>
      </DrawerContent>
    </Drawer>
  );
};

export { DiscoverFilterDrawer };
