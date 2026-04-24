import { Box, Text } from '@/components/ui';
import { useGetStoryById } from '@/src/actions';
import { useLocalSearchParams } from 'expo-router';

const StoryVoteResultPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: story } = useGetStoryById(id);

  if (!story) return <></>;

  return (
    <Box className="flex-1 justify-center items-center">
      <Text>Oylama Sonucu</Text>
      {Object.keys(story.votes).map((e, i) => (
        <Text key={i.toString()}>
          {e}: {story.votes[e]}
        </Text>
      ))}
    </Box>
  );
};

export default StoryVoteResultPage;
