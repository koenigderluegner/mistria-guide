import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinifiedItem } from '@mistria-guide/data-types';
import { SpriteComponent } from '../sprite/sprite.component';

@Component({
  selector: 'app-list-entry-item',
  imports: [RouterLink, SpriteComponent],
  templateUrl: './list-entry-item.component.html',
  host: {
    class: 'inline-flex',
  },
})
export class ListEntryItemComponent {
  item = input.required<MinifiedItem>();
}
