import { Box, Pressable, Text } from '@/components/ui';

interface IStoryFilterBadge {
  selected: boolean;
  label: string;
  onPress: () => void;
}

const StoryFilterBadge: React.FC<IStoryFilterBadge> = ({ label, onPress, selected }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        className={`border p-3 px-4 bg-transparent ${selected ? 'rounded-3xl border-border-500' : 'bg-transparent border-transparent'}`}
      >
        <Text className={`${selected ? 'text-text-500' : 'text-quickSilver-500'} font-medium`}>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export { StoryFilterBadge };
