import { makeAutoObservable, runInAction } from 'mobx';
import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { authStore } from './AuthStore';
import { Folder } from '../types';
import { handleError } from '../utils/error-handler';

class FolderStore {
  folders: Folder[] = [];
  loading = false;
  unsubscribe: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  startListening() {
    if (!authStore.user) return;

    try {
      const q = query(
        collection(db, 'folders'),
        where('userId', '==', authStore.user.uid)
      );

      this.unsubscribe = onSnapshot(q, (snapshot) => {
        runInAction(() => {
          this.folders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: (doc.data().createdAt as Timestamp).toDate(),
          })) as Folder[];
        });
      });
    } catch (error) {
      handleError(error, 'Failed to load folders');
    }
  }

  stopListening() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  async addFolder(name: string, icon?: string) {
    if (!authStore.user) return;

    try {
      await addDoc(collection(db, 'folders'), {
        name,
        icon,
        userId: authStore.user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleError(error, 'Failed to add folder');
    }
  }

  async updateFolder(id: string, updates: Partial<Folder>) {
    try {
      await updateDoc(doc(db, 'folders', id), updates);
    } catch (error) {
      throw handleError(error, 'Failed to update folder');
    }
  }

  async deleteFolder(id: string) {
    try {
      await deleteDoc(doc(db, 'folders', id));
    } catch (error) {
      throw handleError(error, 'Failed to delete folder');
    }
  }
}

export const folderStore = new FolderStore();