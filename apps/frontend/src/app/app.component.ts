import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { Item, ItemId } from '@mistria-guide/data-types';

@Component({
  imports: [RouterModule, KeyValuePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items = httpResource<Record<ItemId, Item>>('/database/items.json');
}
