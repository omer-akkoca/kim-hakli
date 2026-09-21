import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addBookmarkStory,
  removeBookmarkStory,
  getBookmarkedStoryIds,
  getStoriesByIds,
} from '@/src/services';
import { addBookmark, removeBookmark, useAppDispatch } from '@/src/store';

const bookmarksKeys = {
  bookmarkedStoryIds: (userId?: string) => ['stories', 'bookmarked-ids', userId],
  storiesByIds: (storyIds: string[]) => ['stories', 'by-ids', ...storyIds] as const,
};

export const useGetBookmarkedStoryIds = (userId?: string) => {
  return useQuery({
    queryKey: bookmarksKeys.bookmarkedStoryIds(userId),
    queryFn: () => getBookmarkedStoryIds(userId!),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useAddBookmarkStory = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: addBookmarkStory,

    onSuccess: (storyId) => {
      dispatch(addBookmark(storyId));
    },
  });
};

export const useRemoveBookmark = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: removeBookmarkStory,

    onSuccess: (storyId) => {
      dispatch(removeBookmark(storyId));
    },
  });
};

export const useGetStoriesByIds = (storyIds: string[]) => {
  return useQuery({
    queryKey: bookmarksKeys.storiesByIds(storyIds),
    queryFn: () => getStoriesByIds(storyIds),
    enabled: storyIds.length > 0,
  });
};
