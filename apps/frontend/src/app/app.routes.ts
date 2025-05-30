import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'item/:itemId',
    loadComponent: () =>
      import('./item/item.component').then((c) => c.ItemComponent),
  },
];
