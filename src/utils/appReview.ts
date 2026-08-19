import * as StoreReview from 'expo-store-review';
import { STORAGE_KEYS } from '@/src/constants';
import { storage } from './storage';

const REVIEW_COOLDOWN_DAYS = 125;

export const requestNativeAppReview = async () => {
  const lastRequestedAt = await storage.get<string>(STORAGE_KEYS.REVIEW_REQUESTED_AT);

  if (lastRequestedAt) {
    const elapsedMs = Date.now() - new Date(lastRequestedAt).getTime();
    const cooldownMs = REVIEW_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

    if (elapsedMs < cooldownMs) return;
  }

  const canRequest = await StoreReview.hasAction();

  if (!canRequest) return;

  await StoreReview.requestReview();

  await storage.set(STORAGE_KEYS.REVIEW_REQUESTED_AT, new Date().toISOString());
};
