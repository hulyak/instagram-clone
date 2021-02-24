import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(userName) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userName', '==', userName)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

// query for a userId in the collection of users by the passed userId
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}
