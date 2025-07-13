import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarMenuItemDirective } from '../sidebar-menu-item.directive';
import { SpriteComponent } from '../../shared/sprite/sprite.component';
import { IconSprite } from '@mistria-guide/data-types';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { SidebarContainerComponent } from '../sidebar-container.component';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [
    RouterLink,
    SidebarMenuItemDirective,
    SpriteComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './sidebar-menu-item.html',
})
export class SidebarMenuItem {
  icon = input.required<IconSprite>();
  text = input.required<string>();
  link = input.required<RouterLink['routerLink']>();
  activeOptions = input<RouterLinkActive['routerLinkActiveOptions']>();

  #sidebar = inject(SidebarContainerComponent);
  protected isSidebarOpen = computed(
    () =>
      this.#sidebar.sidebarMenuOpen() || this.#sidebar.mobileSidebarMenuOpen()
  );
}
