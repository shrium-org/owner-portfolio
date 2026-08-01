import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'appearance:theme';
const WALLPAPER_KEY = 'appearance:wallpaper';

const DEFAULT_THEME: Theme = 'dark';
const DEFAULT_WALLPAPER = '/images/wallpaper.png';

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  theme = signal<Theme>(this.readStoredTheme());
  wallpaper = signal<string>(localStorage.getItem(WALLPAPER_KEY) ?? DEFAULT_WALLPAPER);

  constructor() {
    // apply on startup, then keep <html data-theme="..."> in sync going forward
    this.applyThemeToDocument(this.theme());
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
    localStorage.setItem(THEME_KEY, theme);
    this.applyThemeToDocument(theme);
  }

  setWallpaper(path: string) {
    this.wallpaper.set(path);
    localStorage.setItem(WALLPAPER_KEY, path);
  }

  private applyThemeToDocument(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private readStoredTheme(): Theme {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
  }
}