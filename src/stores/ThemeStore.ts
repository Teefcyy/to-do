import { makeAutoObservable } from 'mobx';

class ThemeStore {
  isDark = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}

export const themeStore = new ThemeStore();