import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6lDLC6QrF4WN7kz6VP3YjHUP50lm48sg',
  authDomain: 'my--tourist-app.firebaseapp.com',
  projectId: 'my--tourist-app',
  storageBucket: 'my--tourist-app.firebasestorage.app',
  messagingSenderId: '1028760519193',
  appId: '1:1028760519193:web:6f08f064804fc72f2f2088',
  measurementId: 'G-2W56YCFF8K',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
