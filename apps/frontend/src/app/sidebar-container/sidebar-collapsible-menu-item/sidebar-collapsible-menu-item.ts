import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpriteComponent } from '../../shared/sprite/sprite.component';
import { IconSprite } from '@mistria-guide/data-types';
import { SidebarMenuItemDirective } from '../sidebar-menu-item.directive';

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

  toggleCollapsible() {
    this.collapsibleState.update((state) =>
      state === 'open' ? 'closed' : 'open'
    );
  }
}
