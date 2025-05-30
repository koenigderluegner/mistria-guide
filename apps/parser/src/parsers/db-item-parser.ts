import { itemParser } from './item-parser';
import { DbItem, ItemIds } from '@mistria-guide/data-types';
import { bugParser } from './bug-parser';
import { fishParser } from './fish-parser';

export function dbItemParser(
  items: ReturnType<typeof itemParser>,
  bugs: ReturnType<typeof bugParser>,
  fish: ReturnType<typeof fishParser>
) {
  const fishValues = Object.values(fish);

  return ItemIds.map((id) => {
    const dbItem: DbItem = { id, item: items[id] };

    dbItem.fish = fishValues.find((f) => f.item === id) ?? fish[id];
    dbItem.bug = bugs[id];

    return dbItem;
  });
}
