import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideLogOut, lucideMoon, lucidePalette, lucideSun } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { filter, map, startWith } from 'rxjs';
import { APP_SETTINGS } from '../../../core/config/app-settings';
import type { TranslationKey } from '../../../core/config/translations';
import { LayoutService } from '../../../core/services/layout.service';
import { ThemeService } from '../../../core/services/theme.service';

interface AppNotification {
  id: string;
  titleKey: TranslationKey;
  timeKey: TranslationKey;
}

const ROUTE_LABELS: Record<string, TranslationKey> = {
  starter: 'nav.starter',
  'ui-components': 'nav.components',
};

@Component({
  selector: 'app-header',
  imports: [
    HlmAvatarImports,
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmDropdownMenuImports,
    HlmSidebarImports,
    NgIcon,
    RouterLink,
  ],
  providers: [provideIcons({ lucideBell, lucideLogOut, lucideMoon, lucidePalette, lucideSun })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
})
export class Header {
  protected readonly layout = inject(LayoutService);
  protected readonly theme = inject(ThemeService);
  protected readonly settings = APP_SETTINGS;
  private readonly router = inject(Router);

  protected readonly notifications = signal<AppNotification[]>([
    { id: 'report', titleKey: 'notifications.report', timeKey: 'notifications.now' },
    { id: 'user', titleKey: 'notifications.user', timeKey: 'notifications.hour' },
    { id: 'storage', titleKey: 'notifications.storage', timeKey: 'notifications.yesterday' },
  ]);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected crumbs(): TranslationKey[] {
    return this.currentUrl()
      .split(/[?#]/)[0]
      .split('/')
      .filter((segment) => segment in ROUTE_LABELS)
      .map((segment) => ROUTE_LABELS[segment]);
  }

  protected dismiss(id: string): void {
    this.notifications.update((items) => items.filter((item) => item.id !== id));
  }

  protected logout(): void {
    void this.router.navigate(['/auth/login']);
  }
}
