import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SpriteComponent } from '../../shared/sprite/sprite.component';
import { IconSprite } from '@mistria-guide/data-types';
import { SidebarMenuItemDirective } from '../sidebar-menu-item.directive';
import { SidebarContainerComponent } from '../sidebar-container.component';

@Component({
  selector: 'app-sidebar-collapsible-menu-item',
  imports: [RouterLink, SpriteComponent, SidebarMenuItemDirective],
  templateUrl: './sidebar-collapsible-menu-item.html',
})
export class SidebarCollapsibleMenuItem {
  triggerIcon = input.required<IconSprite>();
  triggerText = input.required<string>();
  subItems = input<{ name: string; link: RouterLink['routerLink'] }[]>();

  collapsibleState = signal<'closed' | 'open'>('open');
  #router = inject(Router);
  #sidebar = inject(SidebarContainerComponent);
  isSidebarOpen = computed(
    () =>
      this.#sidebar.sidebarMenuOpen() || this.#sidebar.mobileSidebarMenuOpen()
  );

  toggleCollapsible() {
    this.collapsibleState.update((state) =>
      state === 'open' ? 'closed' : 'open'
    );
  }

  protected routeToFirstSubItem() {
    const firstItem = this.subItems()?.[0];
    if (!firstItem) return;
    this.#router.navigate([firstItem.link]).then();
  }
}
