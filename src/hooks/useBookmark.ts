import { useMemo, useCallback } from 'react';
import { getIsBookmarked, useAppSelector } from '../store';
import { BookmarkFillVector, BookmarkOutlineVector } from '@/assets/vectors/vectors';
import { useAddBookmarkStory, useRemoveBookmark } from '../actions';
import { BookmarkParams } from '../types';

const useBookmark = (id: string) => {
  const { user } = useAppSelector((state) => state.auth);
  const isBookmarked = useAppSelector((state) => getIsBookmarked(state, id));

  const { mutate: add, isPending: addPending } = useAddBookmarkStory();
  const { mutate: remove, isPending: removePending } = useRemoveBookmark();

  const BookmarkIcon = useMemo(
    () => (isBookmarked ? BookmarkFillVector : BookmarkOutlineVector),
    [isBookmarked],
  );

  const userId = useMemo(() => user?.id ?? '', [user]);
  const loading = useMemo(() => addPending || removePending, [addPending, removePending]);

  const toggleBookmark = useCallback(() => {
    const params: BookmarkParams = {
      storyId: id,
      userId: userId,
    };
    if (isBookmarked) {
      remove(params);
    } else {
      add(params);
    }
  }, [isBookmarked, id, userId]);

  return { BookmarkIcon, toggleBookmark, loading };
};

export { useBookmark };
