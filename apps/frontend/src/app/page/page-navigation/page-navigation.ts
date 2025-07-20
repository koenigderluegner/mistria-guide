import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-navigation',
  imports: [HlmButtonDirective],
  templateUrl: './page-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative max-xl:w-[calc(100%+2rem)] max-xl:-ml-4  xl:right-0 border-sidebar-border  max-xl:border-b xl:border-l max-h-min w-full flex flex-col xl:fixed xl:right-[1rem] xl:top-[64px] h-fit xl:w-56 xl:pr-2 xl:max-h-[calc(100vh-64px)] xl:h-[calc(100vh-64px)] oveflow-scroll peer/page-nav',
  },
})
export class PageNavigation {
  menuTriggerLabel = input<string>('Menu');
  open = signal(false);

  #router = inject(Router);

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.open.set(false);
      }
    });
  }

  toggleMenuVisibility() {
    this.open.update((open) => !open);
  }
}
