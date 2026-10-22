import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { HlmSidebarService, type SidebarVariant } from '@spartan-ng/helm/sidebar';
import {
  APP_SETTINGS,
  type AppLanguage,
  type SidebarCollapsible,
} from '../config/app-settings';
import { TRANSLATIONS, type TranslationKey } from '../config/translations';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly document = inject(DOCUMENT);
  private readonly sidebar = inject(HlmSidebarService);
  private readonly storage = this.document.defaultView?.localStorage;

  readonly language = signal<AppLanguage>(this.readLanguage());
  readonly sidebarVariant = signal<SidebarVariant>(this.readVariant());
  readonly sidebarCollapsible = signal<SidebarCollapsible>(this.readCollapsible());
  readonly customizerOpen = signal(false);
  readonly sidebarOpen = this.sidebar.open;
  readonly sidebarState = this.sidebar.state;

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.language();
      this.sidebar.setVariant(this.sidebarVariant());
      this.storage?.setItem(APP_SETTINGS.storageKeys.language, this.language());
      this.storage?.setItem(APP_SETTINGS.storageKeys.sidebarVariant, this.sidebarVariant());
      this.storage?.setItem(APP_SETTINGS.storageKeys.sidebarCollapsible, this.sidebarCollapsible());
    });
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[this.language()][key];
  }

  setLanguage(language: AppLanguage): void {
    this.language.set(language);
  }

  setSidebarVariant(variant: SidebarVariant): void {
    this.sidebarVariant.set(variant);
  }

  setSidebarCollapsible(collapsible: SidebarCollapsible): void {
    this.sidebarCollapsible.set(collapsible);
  }

  toggleSidebar(): void {
    this.sidebar.toggleSidebar();
  }

  setCustomizerOpen(open: boolean): void {
    this.customizerOpen.set(open);
  }

  toggleCustomizer(): void {
    this.customizerOpen.update((open) => !open);
  }

  private readLanguage(): AppLanguage {
    const stored = this.storage?.getItem(APP_SETTINGS.storageKeys.language);
    return stored === 'es' || stored === 'en' ? stored : APP_SETTINGS.defaultLanguage;
  }

  private readVariant(): SidebarVariant {
    const stored = this.storage?.getItem(APP_SETTINGS.storageKeys.sidebarVariant);
    if (stored === 'sidebar' || stored === 'floating' || stored === 'inset') return stored;
    return APP_SETTINGS.sidebar.variant;
  }

  private readCollapsible(): SidebarCollapsible {
    const stored = this.storage?.getItem(APP_SETTINGS.storageKeys.sidebarCollapsible);
    if (stored === 'offcanvas' || stored === 'icon' || stored === 'none') return stored;
    return APP_SETTINGS.sidebar.collapsible;
  }
}
