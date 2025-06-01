import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  imports: [RouterModule, SidebarContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  #matIconRegistry = inject(MatIconRegistry);
  #domSanitizer = inject(DomSanitizer);

  constructor() {
    this.#matIconRegistry.addSvgIcon(
      'github-mark',
      this.#domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui/github-mark.svg'
      )
    );
  }
}
