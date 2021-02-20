// import { seedDatabase } from '../seed.js';

const config = {
  apiKey: 'AIzaSyCJdbpV8NNYAajhb9MRWW6jGzDOxoIW4Rw',
  authDomain: 'instagram-350a7.firebaseapp.com',
  projectId: 'instagram-350a7',
  storageBucket: 'instagram-350a7.appspot.com',
  messagingSenderId: '221726072042',
  appId: '1:221726072042:web:4c6eea3bbbbf15963ecb93',
  measurementId: 'G-7VQZWKK9BM',
};

const firebase = window.firebase.initializeApp(config);
// firebase field
const { FieldValue } = window.firebase.firestore;

// run only once
// seedDatabase(firebase);
export { firebase, FieldValue };
