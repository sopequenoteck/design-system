import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'custom';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'ds-showcase-theme';

  /** Signal réactif du thème courant */
  readonly currentTheme = signal<Theme>(this.loadFromStorage());

  constructor() {
    // Appliquer le thème au démarrage et à chaque changement
    effect(() => {
      this.applyToDOM(this.currentTheme());
    });
  }

  /**
   * Change le thème actif
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.saveToStorage(theme);
  }

  /**
   * Bascule entre light et dark (ignore custom)
   */
  toggleTheme(): void {
    const current = this.currentTheme();
    const next: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  /**
   * Détecte la préférence système
   */
  detectSystemPreference(): Theme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Utilise la préférence système
   */
  useSystemPreference(): void {
    this.setTheme(this.detectSystemPreference());
  }

  private loadFromStorage(): Theme {
    if (typeof localStorage === 'undefined') return 'light';

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored && this.isValidTheme(stored)) {
      return stored as Theme;
    }

    // Fallback sur la préférence système
    return this.detectSystemPreference();
  }

  private saveToStorage(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  private applyToDOM(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Retirer toutes les classes de thème
    root.classList.remove('theme-light', 'theme-dark', 'theme-custom');

    // Ajouter la nouvelle classe
    root.classList.add(`theme-${theme}`);

    // Mettre à jour le data attribute pour CSS queries
    root.setAttribute('data-theme', theme);
  }

  private isValidTheme(value: string): value is Theme {
    return ['light', 'dark', 'custom'].includes(value);
  }
}
