import { Bug, ItemId, RawBug, transformBug } from '@mistria-guide/data-types';
import { TypesGenerator } from '../types-generator/types-generator';

export function bugParser(items: Record<ItemId, RawBug>) {
  const res: Record<string, Bug> = {};

  const bugType: string[] = [];
  const bugSpawnMethod: string[] = [];
  const seasons: string[] = [];
  const weather: string[] = [];
  const rarity: string[] = [];
  const likedObjectCategories: string[] = [];
  const locations: string[] = [];
  const dungeonBiomes: string[] = [];
  const bugAttractions: string[] = [];
  const defaultBug = items['default'];
  const itemIds = Object.keys(items).filter((id) => id !== 'default');

  itemIds.forEach((itemId) => {
    const item: RawBug = items[itemId];
    const resBug = transformBug(item, defaultBug);

    bugType.push(resBug.type);
    bugSpawnMethod.push(...[resBug.spawn].flat());
    seasons.push(...resBug.seasons);
    weather.push(...resBug.weather);
    rarity.push(resBug.rarity);

    if (resBug.liked_object_categories) {
      likedObjectCategories.push(...resBug.liked_object_categories);
    }
    if (resBug.locations) {
      locations.push(...resBug.locations);
    }
    if (resBug.dungeon_biome) {
      dungeonBiomes.push(resBug.dungeon_biome);
    }
    if (resBug.attraction) {
      bugAttractions.push(resBug.attraction);
    }

    // resBug.

    res[itemId] = resBug;
  });

  TypesGenerator.addEnum([...new Set(bugType)], 'BugType');
  TypesGenerator.addEnum([...new Set(bugSpawnMethod)], 'BugSpawnMethod');
  TypesGenerator.addEnum([...new Set(seasons)], 'Season');
  TypesGenerator.addEnum([...new Set(weather)], 'Weather');
  TypesGenerator.addEnum([...new Set(rarity)], 'BugRarity', 'BugRarities');
  TypesGenerator.addEnum([...new Set(locations)], 'Location');
  TypesGenerator.addEnum([...new Set(bugAttractions)], 'BugAttraction');
  TypesGenerator.addEnum([...new Set(dungeonBiomes)], 'DungeonBiome');
  TypesGenerator.addEnum(
    [...new Set(likedObjectCategories)],
    'BugLikedObjectCategory',
    'BugLikedObjectCategories'
  );
  return res;
}
