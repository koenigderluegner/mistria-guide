import { Component, input } from '@angular/core';
import { DbItem, Item, ItemId, MinifiedItem } from '@mistria-guide/data-types';
import { httpResource } from '@angular/common/http';
import { SpriteComponent } from '../sprite/sprite.component';
import { CatchableInformation } from '../../item/catchable-information/catchable-information';

@Component({
  selector: 'app-item-hover-card-content',
  imports: [SpriteComponent, CatchableInformation],
  templateUrl: './item-hover-card-content.component.html',
})
export class ItemHoverCardContentComponent {
  itemId = input<ItemId | undefined, ItemId | Item | MinifiedItem | undefined>(
    undefined,
    {
      transform: (value) =>
        !value ? value : typeof value === 'string' ? value : value.id,
    }
  );
  readonly item = httpResource<DbItem>(() =>
    this.itemId() ? `database/item/${this.itemId()}.json` : undefined
  );
}
