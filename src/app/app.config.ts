import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHlmSidebarConfig } from '@spartan-ng/helm/sidebar';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { routes } from './app.routes';
import { APP_SETTINGS } from './core/config/app-settings';
import { LayoutService } from './core/services/layout.service';
import { ThemeService } from './core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSpartanHlm(),
    provideHlmSidebarConfig({
      defaultOpen: APP_SETTINGS.sidebar.defaultOpen,
      closeMobileSidebarOnMenuButtonClick: APP_SETTINGS.sidebar.closeOnNavigate,
    }),
    provideAppInitializer(() => {
      inject(ThemeService);
      inject(LayoutService);
    }),
  ],
};
