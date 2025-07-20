import {
  Component,
  DOCUMENT,
  effect,
  inject,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarMenuItemDirective } from './sidebar-menu-item.directive';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { DungeonIds, SkillIds, WingIds } from '@mistria-guide/data-types';
import { SidebarMenuItem } from './sidebar-menu-item/sidebar-menu-item';

@Component({
  selector: 'app-sidebar-container',
  imports: [
    NgTemplateOutlet,
    SidebarMenuItemDirective,
    MatIcon,
    RouterLink,
    SidebarMenuItem,
  ],
  templateUrl: './sidebar-container.component.html',
})
export class SidebarContainerComponent {
  sidebarMenuOpen = signal(true);
  mobileSidebarMenuOpen = signal(false);
  breakpointObserver = inject(BreakpointObserver);
  isSmallScreen = signal(false);
  showMobileSidebar = linkedSignal(() => {
    return (
      this.isSmallScreen() && untracked(() => this.mobileSidebarMenuOpen())
    );
  });
  protected museumWingLink = `/museum/${WingIds[0]}`;
  protected skillLink = `/skills/${SkillIds[0]}`;
  protected dungeonId = `/dungeons/${DungeonIds[0]}`;
  #document = inject(DOCUMENT);
  #router = inject(Router);

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileSidebarMenuOpen.set(false);
      }
    });

    effect(() => {
      if (this.mobileSidebarMenuOpen() && this.isSmallScreen()) {
        untracked(() => this.showMobileSidebar.set(true));
      }
    });

    const style = this.#document.defaultView
      ?.getComputedStyle(this.#document.body)
      .getPropertyValue('--breakpoint-md');
    const value = `(max-width: ${style})`;
    this.breakpointObserver.observe(value).subscribe((result) => {
      this.isSmallScreen.set(result.matches);
    });
  }

  toggleSidebarMenu() {
    if (this.isSmallScreen()) {
      this.mobileSidebarMenuOpen.update((open) => !open);
      return;
    } else {
      this.sidebarMenuOpen.update((open) => !open);
    }
  }

  removeSidebarWhenClosed() {
    if (!this.mobileSidebarMenuOpen()) this.showMobileSidebar.set(false);
  }

  toggleTheme() {
    const htmlElement = this.#document.documentElement;
    const isDarkMode = htmlElement.classList.contains('dark');
    const theme = isDarkMode ? 'light' : 'dark';
    const oldTheme = !isDarkMode ? 'light' : 'dark';

    htmlElement.classList.toggle(theme);
    htmlElement.classList.remove(oldTheme);
    htmlElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }
}
