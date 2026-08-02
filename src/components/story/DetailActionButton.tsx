import React from 'react';
import { IStory } from '@/src/types';
import { useRouter } from 'expo-router';
import { DetailPrimaryButton, DetailSecondaryButton } from './DetailButton';
import { Book6Vector, ChartVector, LockCircleVector, LoopVector } from '@/assets';
import { useStoryAccess, useUnlockStory } from '@/src/actions/story';
import { useAuth, useModal, useToast } from '@/src/hooks';
import { decreaseCredit, useAppDispatch } from '@/src/store';

interface DetailActionButtonProps {
  story: IStory;
}

const DetailActionButton: React.FC<DetailActionButtonProps> = ({ story }) => {
  const storyId = story.id;

  const { push } = useRouter();
  const { show } = useModal();
  const { show: showToast } = useToast();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const { data } = useStoryAccess({
    storyId,
    userId: user?.id,
  });

  const { mutate, isPending } = useUnlockStory(user?.id ?? '');

  const handleReadStory = () => {
    push({ pathname: `/story/read/${storyId}` as any, params: { status: story.status } });
  };

  const handleUnlockStory = async () => {
    if (!user) {
      show({
        title: 'Devam Et',
        subtitle: 'Hikayeyi okumaya devam etmek için lütfen giriş yapınız.',
        buttons: [
          {
            label: 'Giriş Yap',
            onPress: () => push('/auth/login'),
          },
          {
            label: 'Daha Sonra',
          },
        ],
      });
      return;
    }
    mutate(
      { storyId: storyId },
      {
        onSuccess: ({ success }) => {
          if (success) {
            dispatch(decreaseCredit(story!.credit_cost));
            push(`/story/read/${storyId}`);
          }
        },
        onError: (error) => {
          showToast({
            type: 'error',
            title: 'Hikaye Kilidi Açılamadı',
            description: error.message,
          });
        },
      },
    );
  };

  if (story.status === 'completed')
    return (
      <DetailPrimaryButton
        icon={Book6Vector}
        label={'Hikayeyi Oku'}
        onPress={handleReadStory}
        flex
      />
    );

  return data && data.unlocked ? (
    <>
      <DetailPrimaryButton
        icon={data.voted ? LoopVector : Book6Vector}
        label={data.voted ? 'Tekrar Oku' : 'Hikayeyi Oku'}
        onPress={handleReadStory}
        flex
      />
      {data.voted ? (
        <DetailSecondaryButton
          icon={ChartVector}
          label={'Sonuçları Gör'}
          onPress={() => push(`/story/voteResult/${storyId}`)}
          flex
        />
      ) : null}
    </>
  ) : (
    <DetailPrimaryButton
      icon={LockCircleVector}
      label="Hikaye Kilidini Aç"
      onPress={handleUnlockStory}
      loading={isPending}
      flex
    />
  );
};

export { DetailActionButton };
