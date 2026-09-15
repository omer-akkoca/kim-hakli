import React from 'react';
import { useRouter } from 'expo-router';
import { Book6Vector, ChartVector, LockCircleVector, LoopVector } from '@/assets';
import { GetStoryAccessResponse, IStory } from '@/src/types';
import { useUnlockStory } from '@/src/actions/story';
import { useAuth, useModal, useToast } from '@/src/hooks';
import { decreaseCredit, useAppDispatch } from '@/src/store';
import { AppPrimaryButton, AppSecondaryButton } from '../ui/AppButtons';

interface DetailActionButtonProps {
  story: IStory;
  storyAccess?: GetStoryAccessResponse;
}

const DetailActionButton: React.FC<DetailActionButtonProps> = ({ story, storyAccess }) => {
  const storyId = story.id;

  const { push } = useRouter();
  const { show } = useModal();
  const { show: showToast } = useToast();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

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
      <>
        <AppPrimaryButton
          icon={Book6Vector}
          label={'Hikayeyi Oku'}
          onPress={handleReadStory}
          flex
        />
        <AppSecondaryButton
          icon={ChartVector}
          label={'Sonuçları Gör'}
          onPress={() => push(`/story/voteResult/${storyId}`)}
          flex
        />
      </>
    );

  return storyAccess && storyAccess.unlocked ? (
    <>
      <AppPrimaryButton
        icon={storyAccess.voted ? LoopVector : Book6Vector}
        label={storyAccess.voted ? 'Tekrar Oku' : 'Hikayeyi Oku'}
        onPress={handleReadStory}
        flex
      />
      {storyAccess.voted ? (
        <AppSecondaryButton
          icon={ChartVector}
          label={'Sonuçları Gör'}
          onPress={() => push(`/story/voteResult/${storyId}`)}
          flex
        />
      ) : null}
    </>
  ) : (
    <AppPrimaryButton
      icon={LockCircleVector}
      label="Hikaye Kilidini Aç"
      onPress={handleUnlockStory}
      loading={isPending}
      flex
    />
  );
};

export { DetailActionButton };
