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
import { handleError } from '../utils/error-handler';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

class TodoStore {
  todos: Todo[] = [];
  loading = false;
  unsubscribe: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  startListening() {
    if (!authStore.user) return;

    try {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', authStore.user.uid)
      );

      this.unsubscribe = onSnapshot(q, (snapshot) => {
        runInAction(() => {
          this.todos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: (doc.data().createdAt as Timestamp).toDate(),
          })) as Todo[];
        });
      });
    } catch (error) {
      handleError(error, 'Failed to load todos');
    }
  }

  stopListening() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  async addTodo(title: string, description: string) {
    if (!authStore.user) return;

    try {
      await addDoc(collection(db, 'todos'), {
        title,
        description,
        completed: false,
        userId: authStore.user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleError(error, 'Failed to add todo');
    }
  }

  async updateTodo(id: string, updates: Partial<Todo>) {
    try {
      await updateDoc(doc(db, 'todos', id), updates);
    } catch (error) {
      throw handleError(error, 'Failed to update todo');
    }
  }

  async deleteTodo(id: string) {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      throw handleError(error, 'Failed to delete todo');
    }
  }

  async toggleComplete(id: string, completed: boolean) {
    await this.updateTodo(id, { completed });
  }
}

export const todoStore = new TodoStore();