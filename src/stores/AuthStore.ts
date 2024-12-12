import { makeAutoObservable } from 'mobx';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { handleError } from '../utils/error-handler';

class AuthStore {
  user: User | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.loading = false;
    });
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw handleError(error, 'Failed to sign in');
    }
  }

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw handleError(error, 'Failed to create account');
    }
  }

  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw handleError(error, 'Failed to sign out');
    }
  }
}

export const authStore = new AuthStore();