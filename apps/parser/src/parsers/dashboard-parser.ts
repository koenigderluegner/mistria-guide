import {
  Dashboard,
  DbItem,
  Seasons,
  Weathers,
} from '@mistria-guide/data-types';
import { ItemMinifier } from '../item-minifier/item-minifier';

export function dashboardParser(items: DbItem[]): Dashboard {
  const itemsWithBug = items.filter((i) => i.bug);
  const itemsWithFish = items.filter(
    (i) =>
      i.fish &&
      !i.fish.is_chest &&
      i.fish.rarity !== 'junk' &&
      i.fish.rarity !== 'artifact_fishing' &&
      i.fish.rarity !== 'artifact_divespots'
  );

  return {
    bugs: itemsWithBug.map((i) => ({
      id: i.id,
      item: ItemMinifier.getMinifiedItem(i.id),
      seasons: i.bug.seasons,
      weather: i.bug.weather,
    })),
    fish: itemsWithFish.map((i) => ({
      id: i.id,
      item: ItemMinifier.getMinifiedItem(i.id),
      seasons: i.fish.seasons ? i.fish.seasons : [...Seasons],
      weather: i.fish.weather ? i.fish.weather : [...Weathers],
    })),
  };
}
