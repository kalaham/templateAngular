import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/full/full-layout').then((module) => module.FullLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'starter' },
      {
        path: 'starter',
        loadComponent: () => import('./pages/starter/starter').then((module) => module.Starter),
      },
      {
        path: 'ui-components',
        loadComponent: () =>
          import('./pages/ui-components/ui-components').then((module) => module.UiComponents),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/blank/blank-layout').then((module) => module.BlankLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((module) => module.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((module) => module.Register),
      },
    ],
  },
  {
    path: 'error',
    loadComponent: () => import('./layouts/blank/blank-layout').then((module) => module.BlankLayout),
    children: [
      {
        path: '404',
        loadComponent: () => import('./pages/errors/not-found').then((module) => module.NotFound),
      },
      {
        path: '500',
        loadComponent: () => import('./pages/errors/server-error').then((module) => module.ServerError),
      },
    ],
  },
  { path: '**', redirectTo: 'error/404' },
];
