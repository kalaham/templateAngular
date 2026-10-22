import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircleAlert,
  lucideComponent,
  lucideLayoutDashboard,
  lucideShield,
} from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { filter, map, startWith } from 'rxjs';
import { APP_SETTINGS } from '../../../core/config/app-settings';
import { LayoutService } from '../../../core/services/layout.service';
import { NAV_GROUPS, type NavItem } from './nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, NgIcon, RouterLink, RouterLinkActive],
  providers: [
    provideIcons({ lucideLayoutDashboard, lucideComponent, lucideShield, lucideCircleAlert }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly layout = inject(LayoutService);
  protected readonly settings = APP_SETTINGS;
  protected readonly groups = NAV_GROUPS;
  private readonly router = inject(Router);
  private readonly collapsed = signal<Record<string, boolean>>({});

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected isActive(route: string | undefined): boolean {
    if (!route) return false;
    const path = this.currentUrl().split(/[?#]/)[0];
    return path === route;
  }

  protected isGroupOpen(item: NavItem): boolean {
    if (item.children?.some((child) => this.isActive(child.route))) return true;
    return !this.collapsed()[item.id];
  }

  protected toggleGroup(item: NavItem): void {
    this.collapsed.update((state) => ({ ...state, [item.id]: this.isGroupOpen(item) }));
  }
}
