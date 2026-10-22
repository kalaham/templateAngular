export interface NavItem {
  id: string;
  labelKey:
    | 'nav.starter'
    | 'nav.components'
    | 'nav.auth'
    | 'nav.login'
    | 'nav.register'
    | 'nav.errors'
    | 'nav.notFound'
    | 'nav.serverError';
  icon?: string;
  route?: string;
  children?: NavItem[];
}

export interface NavGroup {
  id: string;
  labelKey: 'nav.main' | 'nav.pages';
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'main',
    labelKey: 'nav.main',
    items: [
      { id: 'starter', labelKey: 'nav.starter', icon: 'lucideLayoutDashboard', route: '/starter' },
      {
        id: 'components',
        labelKey: 'nav.components',
        icon: 'lucideComponent',
        route: '/ui-components',
      },
    ],
  },
  {
    id: 'pages',
    labelKey: 'nav.pages',
    items: [
      {
        id: 'auth',
        labelKey: 'nav.auth',
        icon: 'lucideShield',
        children: [
          { id: 'login', labelKey: 'nav.login', route: '/auth/login' },
          { id: 'register', labelKey: 'nav.register', route: '/auth/register' },
        ],
      },
      {
        id: 'errors',
        labelKey: 'nav.errors',
        icon: 'lucideCircleAlert',
        children: [
          { id: 'not-found', labelKey: 'nav.notFound', route: '/error/404' },
          { id: 'server-error', labelKey: 'nav.serverError', route: '/error/500' },
        ],
      },
    ],
  },
];
