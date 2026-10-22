import type { TranslationKey } from './translations';

export interface ColorTokens {
  primary: string;
  primaryForeground: string;
  ring: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  chart: string;
}

export interface ColorPreset {
  id: string;
  labelKey: TranslationKey;
  swatch: string;
  light: ColorTokens | null;
  dark: ColorTokens | null;
}

export const COLOR_VARIABLES = [
  '--primary',
  '--primary-foreground',
  '--ring',
  '--sidebar-primary',
  '--sidebar-primary-foreground',
  '--chart-1',
] as const;

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'neutral',
    labelKey: 'color.neutral',
    swatch: 'oklch(0.205 0 0)',
    light: null,
    dark: null,
  },
  {
    id: 'blue',
    labelKey: 'color.blue',
    swatch: 'oklch(0.488 0.243 264.376)',
    light: {
      primary: 'oklch(0.488 0.243 264.376)',
      primaryForeground: 'oklch(0.985 0 0)',
      ring: 'oklch(0.488 0.243 264.376)',
      sidebarPrimary: 'oklch(0.488 0.243 264.376)',
      sidebarPrimaryForeground: 'oklch(0.985 0 0)',
      chart: 'oklch(0.488 0.243 264.376)',
    },
    dark: {
      primary: 'oklch(0.623 0.214 259.815)',
      primaryForeground: 'oklch(0.205 0 0)',
      ring: 'oklch(0.623 0.214 259.815)',
      sidebarPrimary: 'oklch(0.623 0.214 259.815)',
      sidebarPrimaryForeground: 'oklch(0.145 0 0)',
      chart: 'oklch(0.623 0.214 259.815)',
    },
  },
  {
    id: 'violet',
    labelKey: 'color.violet',
    swatch: 'oklch(0.541 0.281 293.009)',
    light: {
      primary: 'oklch(0.541 0.281 293.009)',
      primaryForeground: 'oklch(0.985 0 0)',
      ring: 'oklch(0.541 0.281 293.009)',
      sidebarPrimary: 'oklch(0.541 0.281 293.009)',
      sidebarPrimaryForeground: 'oklch(0.985 0 0)',
      chart: 'oklch(0.541 0.281 293.009)',
    },
    dark: {
      primary: 'oklch(0.702 0.183 293.541)',
      primaryForeground: 'oklch(0.205 0 0)',
      ring: 'oklch(0.702 0.183 293.541)',
      sidebarPrimary: 'oklch(0.702 0.183 293.541)',
      sidebarPrimaryForeground: 'oklch(0.145 0 0)',
      chart: 'oklch(0.702 0.183 293.541)',
    },
  },
  {
    id: 'emerald',
    labelKey: 'color.emerald',
    swatch: 'oklch(0.596 0.145 163.225)',
    light: {
      primary: 'oklch(0.596 0.145 163.225)',
      primaryForeground: 'oklch(0.985 0 0)',
      ring: 'oklch(0.596 0.145 163.225)',
      sidebarPrimary: 'oklch(0.596 0.145 163.225)',
      sidebarPrimaryForeground: 'oklch(0.985 0 0)',
      chart: 'oklch(0.596 0.145 163.225)',
    },
    dark: {
      primary: 'oklch(0.765 0.177 163.223)',
      primaryForeground: 'oklch(0.205 0 0)',
      ring: 'oklch(0.765 0.177 163.223)',
      sidebarPrimary: 'oklch(0.765 0.177 163.223)',
      sidebarPrimaryForeground: 'oklch(0.145 0 0)',
      chart: 'oklch(0.765 0.177 163.223)',
    },
  },
  {
    id: 'orange',
    labelKey: 'color.orange',
    swatch: 'oklch(0.646 0.222 41.116)',
    light: {
      primary: 'oklch(0.646 0.222 41.116)',
      primaryForeground: 'oklch(0.985 0 0)',
      ring: 'oklch(0.646 0.222 41.116)',
      sidebarPrimary: 'oklch(0.646 0.222 41.116)',
      sidebarPrimaryForeground: 'oklch(0.985 0 0)',
      chart: 'oklch(0.646 0.222 41.116)',
    },
    dark: {
      primary: 'oklch(0.75 0.183 55.934)',
      primaryForeground: 'oklch(0.205 0 0)',
      ring: 'oklch(0.75 0.183 55.934)',
      sidebarPrimary: 'oklch(0.75 0.183 55.934)',
      sidebarPrimaryForeground: 'oklch(0.145 0 0)',
      chart: 'oklch(0.75 0.183 55.934)',
    },
  },
];

export function findColorPreset(id: string): ColorPreset {
  return COLOR_PRESETS.find((preset) => preset.id === id) ?? COLOR_PRESETS[0];
}
