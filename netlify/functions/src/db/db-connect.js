const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');

// ========================================================================== //
// Configure firebase database
// ========================================================================== //
admin.initializeApp(
  {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    setLogLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  },
);
// firebase configuration
// const firebaseClient = firebase.initializeApp({
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   setLogLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
// });
// const auth = admin.app().auth();
const firestore = admin.firestore();
const storage = admin.storage().bucket();
const EventTypes = Object.freeze({
  // MESSAGING
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_READ: 'MESSAGE_READ',
  MESSAGE_DELIVERED: 'MESSAGE_DELIVERED',
  // STATUS
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  // AUTH
  AUTHORIZED: 'AUTHORIZED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  // PLAYLISTS
  PLAYLIST_SENT: 'PLAYLIST_SENT',
  PLAYLIST_READ: 'PLAYLIST_READ',
  PLAYLIST_DELIVERED: 'PLAYLIST_DELIVERED',
  // ACTIVITIES
  ACTIVITY_COMPLETED: 'ACTIVITY_SENT',
  ACTIVITY_READ: 'ACTIVITY_READ',
  ACTIVITY_SENT: 'ACTIVITY_SENT',
});

// ========================================================================== //
// Firebase Utility methods
// ========================================================================== //
const reportError = (e) => {
  console.log(e);
  return EventTypes.FAIL;
};

async function readImage(file) {
  // Check if the file is an image.
  if (file.type && file.type.indexOf('image') === -1) {
    console.log('File is not an image.', file.type, file);
    return EventTypes.FAIL;
  }
  return file
    .stream()
    .getReader()
    .read.then((d) => d)
    .catch((e) => reportError(e));
}
async function setPhotoFromClient({ url }) {
  return await this.$fireStorage.ref(url).getDownloadURL();
}

// transactions are meant for read AND write operations, maintining mutual exclision and integrity with the operations
//* *not currently utilizing transactions**
async function runGets(ids, srcCollection = {}, attempts = 3) {
  let docRef;
  if (typeof srcCollection === 'string') {
    // if a string, get a doc ref for that collection
    docRef = firestore.collection(srcCollection);
  } else {
    // else the srcCollection is a docRef
    docRef = srcCollection;
  }
  const data = await ids.map(
    async (id) => docRef
      .doc(id)
      .get()
      .then((d) => d.data())
      .catch((e) => reportError(e)),
  );

  console.log(data);
  return data;
}

// ========================================================================== //
// Field operations
// ========================================================================== //
// const updateField = (field) => firebase.default.firestore.(field);
// use when setting specific fields in a given doc via .update({})
const removeField = (field) => admin.firestore.FieldValue.delete(field);
const addFieldArray = (field) => admin.firestore.FieldValue.arrayUnion(field);
const removeFieldArray = (field) => admin.firestore.FieldValue.arrayRemove(field);
const incrementField = (fieldNumber) => admin.firestore.FieldValue.increment(fieldNumber); // returns fieldvalue
const compareField = (field) => admin.firestore.FieldValue.isEqual(field); // returns fieldvalue
const compareFieldPath = (fieldPath) => admin.firestore.FieldPath.isEqual(fieldPath); // returns fieldvalue
const compareDocsnapshot = (docSnapshot) => admin.firestore.DocumentSnapshot.isEqual(docSnapshot); // returns fieldvalue

// ========================================================================== //
// CRUD methods / session handling
// ========================================================================== //
const getCollection = async (parent, { amount, collectionName }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => firestore
  .collection(collectionName)
  .limit(amount)
  .get()
  .then((u) => u.docs.map((d) => d.data()));
const chainRequests = async (parent, { amount, requests }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => runGets(requests, amount, 12)// returns document snapshots
  .then((requests) => requests.map((request) => request.data()))
  .catch((e) => reportError(e));
const getCollectionField = async (parent, { uid, collectionName, field }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => {
  const measurementDataIds = await firestore
    .collection(collectionName)
    .doc(uid)
    .get()
    .then((u) => u.docs.map((d) => d.data()[field]));
};
const getSessionCookie = async (parent, args, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => (token
  ? auth()
    .createSessionCookie(token)
    .then((sessionCookie) => sessionCookie) // return a sessionCookie ref
    .catch((e) => reportError(e))
  : EventTypes.UNAUTHORIZED);

const uploadPhoto = async (parent, { file, uid, collectionName }) => {
  const image = await readImage(file);
  const imageRef = storage.ref(`${collectionName}/${uid}`);
  const imageUrl = await imageRef.put(image);
  return imageUrl.ref.getDownloadURL();
};
const create = async (parent, { input, collectionName }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => {
  const {
    photoUrl,
  } = input;
  // process photo if one exists
  let photo = photoUrl || null;
  if (photo) photo = await uploadPhoto(photoUrl);

  return firestore
    .collection(collectionName)
    .add(input)
    .then((d) => d.id) // return ref to newly created document
    .catch((e) => reportError(e));
};

const update = async (parent, { uid, input, collectionName }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => firestore
  .collection(collectionName)
  .doc(uid)
  .update(input)// input should reference a db operation ie addFieldArray/compareField/incrementField... etc
  .then((d) => pid) // return ref to newly created document
  .catch((e) => reportError(e));

const deleteItem = async (parent, { uid }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => {
  await firestore
    .collection('users_data')
    .doc(uid)
    .delete()
    .then((d) => d)
    .catch((e) => reportError(e));
  return admin.auth().deleteUser(uid);
};

// ========================================================================== //
// Handle accounts
// ========================================================================== //
const accountHelpers = async (patent, { uid, config }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => {
  const actionCodeSettings = {
    url: '',
    ios: '',
    android: '',
    dynamicLinkdomain: '',
  };

  switch (config.source) {
    case 'ios':
      // web app
      actionCodeSettings.url = process.env.NODE_ENV === 'development'
        ? `localhost:3000/login/?=${config.uid}${token}`
        : `aidenfaulcconer.tech/api/login/?=${config.uid}${token}`;
      break;
    case 'android':
      // web app
      actionCodeSettings.url = process.env.NODE_ENV === 'development'
        ? `localhost:3000/login/?=${config.uid}${token}`
        : `aidenfaulcconer.tech/api/login/?=${config.uid}${token}`;
      break;
    case 'webapp':
      // web app
      actionCodeSettings.url = process.env.NODE_ENV === 'development'
        ? `localhost:3000/login/?=${config.uid}${token}`
        : `aidenfaulcconer.tech/api/login/?=${config.uid}${token}`;
      break;
    default:
      reportError(`${config.source} is not a valid source`);
      return EventTypes.INVALID_SOURCE;
  }

  switch (config.type) {
    case 'emailVerification':
      return auth()
        .generateEmailVerificationLink(config.email, actionCodeSettings)
        .then((_) => EventTypes.SUCCESS)
        .catch((e) => {
          reportError(e);
          return EventTypes.FAIL;
        });
    case 'resetPassword':
      return auth()
        .generatePasswordResetLink(config.email, actionCodeSettings)
        .then((_) => EventTypes.SUCCESS)
        .catch((e) => {
          reportError(e);
          return EventTypes.FAIL;
        });
    case 'emailLogin':
      return auth()
        .generateSignInWithEmailLink(config.email, actionCodeSettings)
        .then((_) => EventTypes.SUCCESS)
        .catch((e) => {
          reportError(e);
          return EventTypes.FAIL;
        });
    default:
      return EventTypes.FAIL;
  }
};

const getToken = async (parent, { uid }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => {
  const customTokenProperties = {};
  return auth()
    .createCustomToken(uid, customTokenProperties)
    .then((token) => token) // return token
    .catch((e) => reportError(e));
};

const checkAuth = async (parent, args, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => (token
    && auth()
      .verifyIdToken(token)
      .then(() => EventTypes.AUTHORIZED)
      .catch((e) => reportError(e)));

const revokeToken = async (parent, { uid }, {
  auth, token, storage, headers, firestore, messaging, firebaseClient, EventTypes,
}) => auth
  .revokeRefreshTokens(uid)
  .then(() => auth().getUser(uid))
  .then((userRecord) => new Date(userRecord.tokensValidAfterTime).getTime() / 1000)
  .then((timestamp) => {
    console.log(`Tokens revoked at: ${timestamp}`);
  });

module.exports = {
  create,
  update,
  deleteItem,
  getSessionCookie,
  checkAuth,
  revokeToken,
  accountHelpers,
  getToken,
  getCollection,
  getCollectionField,

};
