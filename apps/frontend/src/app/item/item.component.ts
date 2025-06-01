import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DbItem } from '@mistria-guide/data-types';
import { JsonPipe } from '@angular/common';
import { SpriteComponent } from '../shared/sprite/sprite.component';

@Component({
  selector: 'app-item',
  imports: [JsonPipe, SpriteComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  itemId = input<string>();
  item = httpResource<DbItem>(() =>
    !this.itemId() ? undefined : 'database/item/' + this.itemId() + '.json'
  );
}
