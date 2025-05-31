import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';

@Component({
  imports: [RouterModule, SidebarContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
