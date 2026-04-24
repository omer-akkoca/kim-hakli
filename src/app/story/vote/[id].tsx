import { Box, Button, ButtonText, Pressable, Text } from '@/components/ui';
import { useGetStoryById } from '@/src/actions';
import { submitVoteFunction } from '@/src/services';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';

export default function StoryVotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedSide, setSelectedSide] = useState<string>('');

  const { data: story } = useGetStoryById(id);

  const handleVote = async () => {
    const { data } = await submitVoteFunction({ storyId: id, side: selectedSide });
    if (data.success) {
      router.replace(`/story/voteResult/${id}`);
    }
  };

  if (!story) return <></>;

  return (
    <Box className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold text-black">Kim Haklı?</Text>
      <Box className="flex-row gap-6 my-10">
        {Object.keys(story.votes).map((e) => {
          const character = story.sides.find((hero) => e === hero.name);

          return (
            <Box key={e} className="gap-2">
              <Pressable
                onPress={() => setSelectedSide(e)}
                className={`border-2 overflow-hidden${selectedSide === e ? 'border-black shadow-md' : 'border-transparent'}`}
              >
                <Image className="w-32 h-32" source={{ uri: character!.photo }} />
              </Pressable>
              <Text className="text-center text-black font-semibold text-lg">
                {character?.name}
              </Text>
            </Box>
          );
        })}
      </Box>
      <Button onPress={handleVote} className="w-3/4">
        <ButtonText>Oy Ver</ButtonText>
      </Button>
    </Box>
  );
}
