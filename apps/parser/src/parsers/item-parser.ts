import {
  Item,
  ItemId,
  RawItem,
  transformItem,
} from '@mistria-guide/data-types';
import { TypesGenerator } from '../types-generator/types-generator';

export function itemParser(
  items: Record<string, Record<string, Record<ItemId, RawItem>>>
) {
  const res: Record<string, Item> = {};

  const allItemIds: string[] = [];
  const iconSprites: string[] = [];
  const toolTypes: string[] = [];
  const quality: string[] = [];
  const tags: string[] = [];
  const itemCategories = Object.keys(items);
  itemCategories.forEach((category) => {
    const sets = Object.keys(items[category]);
    sets.forEach((set) => {
      const itemIds = Object.keys(items[category][set]);
      itemIds.forEach((itemId) => {
        const item = items[category][set][itemId];

        if (item.tool_type) {
          toolTypes.push(item.tool_type);
        }
        if (item.quality) {
          quality.push(item.quality);
        }
        if (item.tags) {
          tags.push(...item.tags);
        }
        if (item.icon_sprite) {
          iconSprites.push(item.icon_sprite);
        }

        allItemIds.push(itemId);
        res[itemId] = transformItem(item);
      });
    });
  });
  TypesGenerator.addEnum([...new Set(allItemIds)], 'ItemId');
  TypesGenerator.addEnum([...new Set(iconSprites)], 'IconSprite');
  TypesGenerator.addEnum([...new Set(toolTypes)], 'ToolType');
  TypesGenerator.addEnum([...new Set(quality)], 'Quality', 'Qualities');
  TypesGenerator.addEnum([...new Set(tags)], 'Tag');
  return res;
}
