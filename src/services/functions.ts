import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/src/configs';
import {
  SubmitVoteParams,
  SubmitVoteResponse,
  UnlockStoryParams,
  UnlockStoryResponse,
} from '../types';

const functions = getFunctions(app);

export const unlockStoryFunction = httpsCallable<UnlockStoryParams, UnlockStoryResponse>(
  functions,
  'unlockStory',
);

export const submitVoteFunction = httpsCallable<SubmitVoteParams, SubmitVoteResponse>(
  functions,
  'submitVote',
);
