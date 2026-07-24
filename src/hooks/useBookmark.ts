import { useCallback } from 'react';
import { BookmarkFillVector, BookmarkOutlineVector } from '@/assets';
import { getIsBookmarked, useAppSelector } from '@/src/store';
import { useAddBookmarkStory, useRemoveBookmark } from '@/src/actions';
import { BookmarkParams } from '@/src/types';

const useBookmark = (id: string) => {
  const userId = useAppSelector((state) => state.auth.user?.id ?? '');
  const isBookmarked = useAppSelector((state) => getIsBookmarked(state, id));

  const { mutate: add, isPending: addPending } = useAddBookmarkStory();
  const { mutate: remove, isPending: removePending } = useRemoveBookmark();

  const BookmarkIcon = isBookmarked ? BookmarkFillVector : BookmarkOutlineVector;

  const loading = addPending || removePending;

  const toggleBookmark = useCallback(() => {
    if (!userId) return;

    const params: BookmarkParams = {
      storyId: id,
      userId,
    };

    if (isBookmarked) {
      remove(params);
      return;
    }

    add(params);
  }, [id, userId, isBookmarked, add, remove]);

  return { BookmarkIcon, toggleBookmark, loading };
};

export { useBookmark };
