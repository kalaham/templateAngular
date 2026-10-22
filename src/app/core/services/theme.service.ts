import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { APP_SETTINGS, type ThemeMode } from '../config/app-settings';
import {
  COLOR_PRESETS,
  COLOR_VARIABLES,
  findColorPreset,
  type ColorTokens,
} from '../config/color-presets';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = this.document.defaultView?.localStorage;

  readonly presets = COLOR_PRESETS;
  readonly mode = signal<ThemeMode>(this.readMode());
  readonly colorId = signal(this.readColor());
  private readonly systemDark = signal(this.readSystemDark());

  resolved(): 'light' | 'dark' {
    const mode = this.mode();
    if (mode === 'system') return this.systemDark() ? 'dark' : 'light';
    return mode;
  }

  constructor() {
    const media = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
    media?.addEventListener('change', (event) => this.systemDark.set(event.matches));

    effect(() => {
      const resolved = this.resolved();
      const root = this.document.documentElement;
      root.classList.toggle('dark', resolved === 'dark');
      root.style.colorScheme = resolved;
      this.applyColor(findColorPreset(this.colorId()).id === 'neutral' ? null : this.tokens(resolved));
      this.storage?.setItem(APP_SETTINGS.storageKeys.theme, this.mode());
      this.storage?.setItem(APP_SETTINGS.storageKeys.color, this.colorId());
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  toggle(): void {
    this.setMode(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  setColor(colorId: string): void {
    this.colorId.set(findColorPreset(colorId).id);
  }

  private tokens(resolved: 'light' | 'dark'): ColorTokens | null {
    const preset = findColorPreset(this.colorId());
    return resolved === 'dark' ? preset.dark : preset.light;
  }

  private applyColor(tokens: ColorTokens | null): void {
    const style = this.document.documentElement.style;
    for (const variable of COLOR_VARIABLES) {
      style.removeProperty(variable);
    }
    if (!tokens) return;

    style.setProperty('--primary', tokens.primary);
    style.setProperty('--primary-foreground', tokens.primaryForeground);
    style.setProperty('--ring', tokens.ring);
    style.setProperty('--sidebar-primary', tokens.sidebarPrimary);
    style.setProperty('--sidebar-primary-foreground', tokens.sidebarPrimaryForeground);
    style.setProperty('--chart-1', tokens.chart);
  }

  private readMode(): ThemeMode {
    const stored = this.storage?.getItem(APP_SETTINGS.storageKeys.theme);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    return APP_SETTINGS.defaultTheme;
  }

  private readColor(): string {
    return findColorPreset(this.storage?.getItem(APP_SETTINGS.storageKeys.color) ?? APP_SETTINGS.defaultColor).id;
  }

  private readSystemDark(): boolean {
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }
}
