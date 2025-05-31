import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
];
