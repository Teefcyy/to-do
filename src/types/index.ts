export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  dueDate?: Date;
  priority: Priority;
  reminder?: Date;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  icon?: string;
}

export interface ThemeConfig {
  isDark: boolean;
  toggleTheme: () => void;
}