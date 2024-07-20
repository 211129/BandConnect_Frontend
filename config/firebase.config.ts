import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';
import {FirebaseOptions, getApp, getApps, initializeApp} from 'firebase/app';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBlDa_5P0AHeu0Y5KBxdiVKK2oKvJTZNu8',
  authDomain: 'bandconnect-69c94.firebaseapp.com',
  projectId: 'bandconnect-69c94',
  storageBucket: 'bandconnect-69c94.appspot.com',
  messagingSenderId: '72792897898',
  appId: '1:72792897898:web:2a87fa034d6bd7fee54d13',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firebaseDB = getFirestore(app);
const firebaseStorage = getStorage(app);

export {app, firebaseAuth, firebaseDB, firebaseStorage};
