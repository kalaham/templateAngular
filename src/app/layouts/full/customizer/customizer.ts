import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import {
  APP_SETTINGS,
  type AppLanguage,
  type SidebarCollapsible,
  type ThemeMode,
} from '../../../core/config/app-settings';
import { LayoutService } from '../../../core/services/layout.service';
import { ThemeService } from '../../../core/services/theme.service';
import type { SidebarVariant } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-customizer',
  imports: [HlmButtonImports, HlmLabelImports, HlmSelectImports, HlmSeparatorImports, HlmSheetImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customizer.html',
})
export class Customizer {
  protected readonly layout = inject(LayoutService);
  protected readonly theme = inject(ThemeService);
  protected readonly settings = APP_SETTINGS;
  protected readonly themeModes: ThemeMode[] = ['light', 'dark', 'system'];
  protected readonly variants: SidebarVariant[] = ['sidebar', 'floating', 'inset'];
  protected readonly collapsibles: SidebarCollapsible[] = ['offcanvas', 'icon', 'none'];

  protected onState(state: 'open' | 'closed'): void {
    this.layout.setCustomizerOpen(state === 'open');
  }

  protected onLanguage(value: unknown): void {
    if (value === 'es' || value === 'en') this.layout.setLanguage(value);
  }

  protected onVariant(value: unknown): void {
    if (value === 'sidebar' || value === 'floating' || value === 'inset') {
      this.layout.setSidebarVariant(value);
    }
  }

  protected onCollapsible(value: unknown): void {
    if (value === 'offcanvas' || value === 'icon' || value === 'none') {
      this.layout.setSidebarCollapsible(value);
    }
  }

  protected themeKey(mode: ThemeMode): 'customizer.light' | 'customizer.dark' | 'customizer.system' {
    if (mode === 'light') return 'customizer.light';
    if (mode === 'dark') return 'customizer.dark';
    return 'customizer.system';
  }

  protected variantKey(
    variant: SidebarVariant,
  ): 'customizer.variant.sidebar' | 'customizer.variant.floating' | 'customizer.variant.inset' {
    return `customizer.variant.${variant}`;
  }

  protected collapsibleKey(
    mode: SidebarCollapsible,
  ):
    | 'customizer.collapsible.offcanvas'
    | 'customizer.collapsible.icon'
    | 'customizer.collapsible.none' {
    return `customizer.collapsible.${mode}`;
  }
}
