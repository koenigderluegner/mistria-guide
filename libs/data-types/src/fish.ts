import {
  FishingLocation,
  FishingRarity,
  FishSize,
  ItemId,
  RetrievalMethod,
  Season,
  WaterType,
  Weather,
} from './generated';

export type RawFish = {
  item: ItemId;
  seasons: false | Season[];
  hours: false;
  water_type: WaterType | WaterType[];
  weather: false | Weather[];
  locations: false | FishingLocation[];
  size: FishSize;
  any_size: boolean;
  legendary: boolean;
  rarity: FishingRarity;
  retrieval: RetrievalMethod | RetrievalMethod[];
  recipe: false;
  is_chest: boolean;
  perk_artifact: false | string;
  has_perk: false | string;
};

export function transformFish(rawBug: RawFish, defaultBug: RawFish): Fish {
  const bug: RawFish = {
    ...defaultBug,
    ...rawBug,
  };
  const { hours, has_perk, perk_artifact, recipe, ...perkLess } = bug;
  const perk = [bug.has_perk, bug.perk_artifact].filter(
    (x): x is string => typeof x === 'string'
  );

  return { ...perkLess, perk };
}

export type Fish = Omit<
  RawFish,
  'hours' | 'has_perk' | 'perk_artifact' | 'recipe'
> & {
  perk: string[];
};
