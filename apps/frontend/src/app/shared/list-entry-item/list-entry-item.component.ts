import { booleanAttribute, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinifiedItem } from '@mistria-guide/data-types';
import { SpriteComponent } from '../sprite/sprite.component';
import {
  BrnHoverCardComponent,
  BrnHoverCardContentDirective,
  BrnHoverCardTriggerDirective,
} from '@spartan-ng/brain/hover-card';
import { HlmHoverCardContentComponent } from '@spartan-ng/helm/hover-card';
import { ItemHoverCardContentComponent } from '../item-hover-card-content/item-hover-card-content.component';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';

@Component({
  selector: 'app-list-entry-item',
  imports: [
    RouterLink,
    SpriteComponent,
    BrnHoverCardContentDirective,
    BrnHoverCardTriggerDirective,
    BrnHoverCardComponent,
    HlmHoverCardContentComponent,
    ItemHoverCardContentComponent,
    HlmCheckboxComponent,
  ],
  templateUrl: './list-entry-item.component.html',
  host: {
    class:
      'inline-flex hover:bg-secondary/80 dark:bg-input/30 dark:hover:bg-input/80 border-input inline-flex rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  },
})
export class ListEntryItemComponent {
  item = input.required<MinifiedItem>();
  checked = input<boolean>();
  hideCheckbox = input(false, { transform: booleanAttribute });
  checkboxChanged = output<boolean>();
  static idCount = 0;
  checkboxId = `checkbox-${ListEntryItemComponent.idCount++}`;
}
