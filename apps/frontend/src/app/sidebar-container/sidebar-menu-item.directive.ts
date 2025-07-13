import { RouterLinkActive } from '@angular/router';
import { Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appSidebarMenuItem]',
  host: {
    '[attr.data-active]': 'routeIsActive()',
  },
  hostDirectives: [
    {
      directive: RouterLinkActive,
      inputs: [
        'routerLinkActive: activeClass',
        'routerLinkActiveOptions: activeOptions',
      ],
    },
  ],
})
export class SidebarMenuItemDirective {
  routeIsActive = toSignal(
    inject(RouterLinkActive, { self: true }).isActiveChange
  );
}
