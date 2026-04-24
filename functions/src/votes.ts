import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const submitVote = functions.https.onCall(async (request) => {
  const { storyId, side } = request.data;
  const userId = request.auth?.uid;

  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', 'Giriş yapmanız gerekiyor.');
  }

  if (!storyId || !side) {
    throw new functions.https.HttpsError('invalid-argument', 'storyId ve side zorunludur.');
  }

  const storyRef = db.collection('stories').doc(storyId);
  const unlockedStoryRef = db
    .collection('users')
    .doc(userId)
    .collection('unlockedStories')
    .doc(storyId);

  const unlockedSnap = await unlockedStoryRef.get();

  if (!unlockedSnap.exists) {
    throw new functions.https.HttpsError('permission-denied', 'Bu hikaye açılmamış.');
  }

  if (unlockedSnap.data()?.votedSide) {
    throw new functions.https.HttpsError('already-exists', 'Zaten oy kullandınız.');
  }

  await db.runTransaction(async (transaction) => {
    transaction.update(storyRef, {
      [`votes.${side}`]: admin.firestore.FieldValue.increment(1),
    });

    transaction.update(unlockedStoryRef, {
      votedSide: side,
    });
  });

  return {
    success: true,
    message: 'Oy başarıyla kaydedildi.',
  };
});
