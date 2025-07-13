import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarMenuItemDirective } from '../sidebar-menu-item.directive';
import { SpriteComponent } from '../../shared/sprite/sprite.component';
import { IconSprite } from '@mistria-guide/data-types';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [RouterLink, SidebarMenuItemDirective, SpriteComponent],
  templateUrl: './sidebar-menu-item.html',
})
export class SidebarMenuItem {
  icon = input.required<IconSprite>();
  text = input.required<string>();
  link = input.required<RouterLink['routerLink']>();
  activeOptions = input<RouterLinkActive['routerLinkActiveOptions']>();
}
