import { Item, RawItem, transformItem } from '@mistria-guide/data-types';

export function itemParser(
  items: Record<string, Record<string, Record<string, RawItem>>>
) {
  const res: Record<string, Item> = {};

  const itemCategories = Object.keys(items);
  itemCategories.forEach((category) => {
    const sets = Object.keys(items[category]);
    sets.forEach((set) => {
      const itemIds = Object.keys(items[category][set]);
      itemIds.forEach((itemId) => {
        const item = items[category][set][itemId];
        res[itemId] = transformItem(item);
      });
    });
  });
  return res;
}
