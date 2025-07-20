import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { computed, Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

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
  #routerLinkActive = inject(RouterLinkActive, { self: true });
  #routerLinkIsActive = toSignal(this.#routerLinkActive.isActiveChange);
  routeIsActive = computed(() => {
    if (this.#routerLinkIsActive()) return true;

    if (
      'activeWhenRouteContains' in
        this.#routerLinkActive.routerLinkActiveOptions &&
      typeof this.#routerLinkActive.routerLinkActiveOptions
        .activeWhenRouteContains === 'string'
    ) {
      return !!this.#currentRoute()?.includes(
        this.#routerLinkActive.routerLinkActiveOptions.activeWhenRouteContains
      );
    }

    return false;
  });
  #router = inject(Router);
  #currentRoute = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.url)
    )
  );
}
