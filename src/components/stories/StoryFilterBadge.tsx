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
        className={`border p-3 px-4 ${selected ? 'bg-white rounded-3xl border-lightGray' : 'bg-transparent border-transparent'}`}
      >
        <Text className={`${selected ? 'text-headline' : 'text-text'} font-medium`}>{label}</Text>
      </Box>
    </Pressable>
  );
};

export { StoryFilterBadge };
