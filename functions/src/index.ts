import * as admin from 'firebase-admin';

admin.initializeApp();

export { submitVote } from './votes';
export { unlockStory } from './story';
