import { Item, ItemId, MinifiedItem } from '@mistria-guide/data-types';

export class ItemMinifier {
  static #items: Record<string, Item> = {};

  static addItems(items: Record<ItemId, Item>) {
    Object.assign(this.#items, items);
  }

  static getMinifiedItem(id: ItemId): MinifiedItem {
    const item = this.#items[id];
    return {
      id,
      name: item.name,
      icon_sprite: item.icon_sprite,
    };
  }
}
