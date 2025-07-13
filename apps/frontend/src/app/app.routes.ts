import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'item/:itemId',
    loadComponent: () =>
      import('./item/item.component').then((c) => c.ItemComponent),
  },
  {
    path: 'skills/:skillId',
    loadComponent: () =>
      import('./skills/skills.component').then((c) => c.SkillsComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./skills/skills.component').then((c) => c.SkillsComponent),
  },
  {
    path: 'museum/:wingId',
    loadComponent: () => import('./museum/museum').then((c) => c.Museum),
  },
  {
    path: 'museum',
    loadComponent: () => import('./museum/museum').then((c) => c.Museum),
  },
];
