import type { SidebarVariant } from '@spartan-ng/helm/sidebar';

export type AppLanguage = 'es' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

export const APP_SETTINGS = {
  name: 'Template',
  description: 'Panel de administración',
  defaultLanguage: 'es' as AppLanguage,
  defaultTheme: 'system' as ThemeMode,
  defaultColor: 'neutral',
  sidebar: {
    defaultOpen: false,
    variant: 'inset' as SidebarVariant,
    collapsible: 'icon' as SidebarCollapsible,
    closeOnNavigate: true,
  },
  storageKeys: {
    theme: 'template.theme',
    color: 'template.color',
    language: 'template.language',
    sidebarVariant: 'template.sidebar.variant',
    sidebarCollapsible: 'template.sidebar.collapsible',
  },
  languages: [
    { code: 'es' as const, label: 'Español' },
    { code: 'en' as const, label: 'English' },
  ],
  user: {
    name: 'Ana PérezZZZ',
    email: 'ana.perez@template.dev',
    initials: 'AP',
  },
};
