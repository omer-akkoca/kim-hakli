import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const unlockStory = functions.https.onCall(async (request) => {
  const { storyId } = request.data;
  const userId = request.auth?.uid;

  if (!userId) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Giriş yapmanız gerekiyor.',
    );
  }

  if (!storyId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'storyId zorunludur.',
    );
  }

  const userRef = db.collection('users').doc(userId);
  const storyRef = db.collection('stories').doc(storyId);
  const unlockedStoryRef = userRef.collection('unlockedStories').doc(storyId);

  await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);
    const storySnap = await transaction.get(storyRef);
    const unlockedSnap = await transaction.get(unlockedStoryRef);

    if (!userSnap.exists) {
      throw new functions.https.HttpsError('not-found', 'Kullanıcı bulunamadı.');
    }

    if (!storySnap.exists) {
      throw new functions.https.HttpsError('not-found', 'Hikaye bulunamadı.');
    }

    if (unlockedSnap.exists) {
      throw new functions.https.HttpsError(
        'already-exists',
        'Bu hikaye zaten açılmış.',
      );
    }

    const userData = userSnap.data();
    const storyData = storySnap.data();

    const userCredits = userData?.credits ?? 0;
    const creditCost = storyData?.creditCost ?? 0;

    if (userCredits < creditCost) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Yeterli krediniz yok.',
      );
    }

    transaction.update(userRef, {
      credits: admin.firestore.FieldValue.increment(-creditCost),
    });

    transaction.set(unlockedStoryRef, {
      unlockedAt: admin.firestore.FieldValue.serverTimestamp(),
      creditsSpent: creditCost,
      votedSide: null,
    });
  });

  return {
    success: true,
    message: 'Hikaye başarıyla açıldı.',
  };
});