import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinifiedItem } from '@mistria-guide/data-types';
import { SpriteComponent } from '../sprite/sprite.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-list-entry-item',
  imports: [RouterLink, SpriteComponent, MatCheckbox],
  templateUrl: './list-entry-item.component.html',
  host: {
    class:
      'inline-flex hover:bg-secondary/80 dark:bg-input/30 dark:hover:bg-input/80 border-input inline-flex rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  },
})
export class ListEntryItemComponent {
  item = input.required<MinifiedItem>();
  checked = input<boolean>();
  checkboxChanged = output<boolean>();
}
