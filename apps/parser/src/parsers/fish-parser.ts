import {
  Fish,
  ItemId,
  RawFish,
  transformFish,
} from '@mistria-guide/data-types';
import { TypesGenerator } from '../types-generator/types-generator';

export function fishParser(items: Record<ItemId, RawFish>) {
  const res: Record<string, Fish> = {};

  const waterType: string[] = [];
  const fishSize: string[] = [];
  const weather: string[] = [];
  const rarity: string[] = [];
  const retrievalMethod: string[] = [];
  const locations: string[] = [];
  const defaultBug = items['default'];
  const itemIds = Object.keys(items).filter((id) => id !== 'default');

  itemIds.forEach((itemId) => {
    const item: RawFish = items[itemId];
    const resBug = transformFish(item, defaultBug);

    waterType.push(...[resBug.water_type].flat());
    fishSize.push(resBug.size);
    if (Array.isArray(resBug.weather)) weather.push(...resBug.weather);
    rarity.push(resBug.rarity);

    retrievalMethod.push(...[resBug.retrieval].flat());

    if (resBug.locations) {
      locations.push(...resBug.locations);
    }

    res[itemId] = resBug;
  });

  TypesGenerator.addEnum([...new Set(waterType)], 'WaterType');
  TypesGenerator.addEnum([...new Set(fishSize)], 'FishSize');
  TypesGenerator.addEnum([...new Set(weather)], 'Weather');
  TypesGenerator.addEnum(
    [...new Set(rarity)],
    'FishingRarity',
    'FishingRarities'
  );
  TypesGenerator.addEnum([...new Set(locations)], 'FishingLocation');
  TypesGenerator.addEnum([...new Set(retrievalMethod)], 'RetrievalMethod');
  return res;
}
