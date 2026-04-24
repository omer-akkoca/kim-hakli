import { Box, Text } from "@/components/ui";
import { getStoryById } from "@/src/services";
import { IStory } from "@/src/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const StoryVoteResultPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

      const [story, setStory] = useState<IStory>();
    
      useEffect(() => {
        const boot = async () => {
          const data = await getStoryById(id);
          if (data) {
            setStory(data);
          }
        };
        boot();
      }, [id]);

  if (!story) return <></>;

    return (
        <Box className="flex-1 justify-center items-center">
            <Text>Oylama Sonucu</Text>
            {
                Object.keys(story.votes).map((e, i) => (
                    <Text key={i.toString()}>{e}: {story.votes[e]}</Text>
                ))
            }
        </Box>
    )
}

export default StoryVoteResultPage;