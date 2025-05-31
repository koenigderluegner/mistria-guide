import {
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar-container',
  imports: [NgTemplateOutlet],
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
  #document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.mobileSidebarMenuOpen() && this.isSmallScreen()) {
        untracked(() => this.showMobileSidebar.set(true));
      }
    });

    const style = this.#document.defaultView
      ?.getComputedStyle(this.#document.body)
      .getPropertyValue('--breakpoint-md');
    const value = `(max-width: ${style})`;
    console.log(value);
    this.breakpointObserver.observe(value).subscribe((result) => {
      console.log(result);
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
}
