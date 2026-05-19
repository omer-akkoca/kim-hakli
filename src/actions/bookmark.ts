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
  useAppSelector,
} from '@/src/store';

export const useGetBookmarkedStoryIds = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const userId = user ? user.id : '';

  const query = useQuery({
    queryKey: ['stories', 'bookmarked-ids', userId],
    queryFn: () => getBookmarkedStoryIds(userId!),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
    queryKey: ['stories', 'by-ids'],
    queryFn: () => getStoriesByIds(storyIds),
    enabled: storyIds.length > 0,
  });
};
