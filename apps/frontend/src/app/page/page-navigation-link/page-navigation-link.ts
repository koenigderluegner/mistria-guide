import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SidebarMenuItemDirective } from '../../sidebar-container/sidebar-menu-item.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-navigation-link',
  imports: [SidebarMenuItemDirective, RouterLink],
  templateUrl: './page-navigation-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationLink {
  link = input.required<string>();
  text = input.required<string>();
}
