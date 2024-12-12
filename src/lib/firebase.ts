import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSHJCnY9S1uduZ9fDsIbjMFJZ7l-9sDUs",
  authDomain: "lots-to-do-app-608ff.firebaseapp.com",
  projectId: "lots-to-do-app-608ff",
  storageBucket: "lots-to-do-app-608ff.firebasestorage.app",
  messagingSenderId: "204321079723",
  appId: "1:204321079723:web:fde0d4626381f09a08d2ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);