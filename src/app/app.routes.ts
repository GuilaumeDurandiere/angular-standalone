import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('@te44-front/login').then((m) => m.loginRoutes),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('@te44-front/shared').then((m) => m.sharedRoutes),
  },
  {
    path: 'link',
    loadChildren: () => import('@te44-front/link').then((m) => m.linkRoutes),
  },
  {
    path: 'documentation',
    loadChildren: () =>
      import('@te44-front/documentation').then((m) => m.documentationRoutes),
  },
  {
    path: 'business-request',
    loadChildren: () =>
      import('@te44-front/business-request').then(
        (m) => m.businessRequestRoutes
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@te44-front/profile').then((m) => m.profileRoutes),
  },
  {
    path: 'business',
    loadChildren: () =>
      import('@te44-front/business').then((m) => m.businessRoutes),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('@te44-front/contact').then((m) => m.contactRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@te44-front/dashboard').then((m) => m.dashboardRoutes),
  },
];
