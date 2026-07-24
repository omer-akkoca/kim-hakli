import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addBookmarkStory,
  removeBookmarkStory,
  getBookmarkedStoryIds,
  getStoriesByIds,
} from '@/src/services';
import {
  addBookmark,
  removeBookmark,
  setBookmarks,
  useAppDispatch,
} from '@/src/store';
import { useAuth } from '@/src/hooks/useAuth';

const bookmarksKeys = {
  bookmarkedStoryIds: (userId?: string) => ['stories', 'bookmarked-ids', userId],
  storiesByIds: ['stories', 'by-ids'],
};

export const useGetBookmarkedStoryIds = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const userId = user?.id;

  const query = useQuery({
    queryKey: bookmarksKeys.bookmarkedStoryIds(userId),
    queryFn: () => getBookmarkedStoryIds(userId!),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

 useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setBookmarks(query.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  return query;
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
    queryKey: bookmarksKeys.storiesByIds,
    queryFn: () => getStoriesByIds(storyIds),
    enabled: storyIds.length > 0,
  });
};
