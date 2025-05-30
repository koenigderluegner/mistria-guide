import {
  BugAttraction,
  BugLikedObjectCategory,
  BugSpawnMethod,
  BugType,
  DungeonBiome,
  Location,
  Rarity,
  Season,
  Weather,
} from './generated';

export type RawBug = {
  type: BugType;
  idle_sprite?: string;
  move_sprite?: string;
  move_range?: number[];
  speed_range?: number[];
  idle_range?: number[];
  has_light?: boolean;
  spawn?: BugSpawnMethod | BugSpawnMethod[];
  seasons: Season[];
  hours: [number, number];
  weather: Weather[];
  rarity: Rarity;
  liked_object_categories?: BugLikedObjectCategory[];
  locations?: Location[];
  can_spawn_on_water?: boolean;
  dungeon_biome?: DungeonBiome | number;
  attraction?: BugAttraction;
};

export function transformBug(rawBug: RawBug, defaultBug: RawBug): Bug {
  const bug: RawBug = {
    ...defaultBug,
    ...rawBug,
  };
  const dungeon_biome =
    typeof bug.dungeon_biome === 'string' ? bug.dungeon_biome : undefined;
  if (!bug.locations) delete bug.locations;
  if (bug.idle_sprite === '<..>') delete bug.idle_sprite;
  if (bug.move_sprite === '<..>') delete bug.move_sprite;
  const spawn = Array.isArray(bug.spawn)
    ? bug.spawn
    : [bug.spawn].filter((x): x is BugSpawnMethod => x !== undefined);
  delete bug.move_range;
  delete bug.speed_range;
  delete bug.idle_range;
  return { ...bug, spawn, dungeon_biome };
}

export type Bug = Omit<
  RawBug,
  'move_range' | 'speed_range' | 'idle_range' | 'spawn'
> & {
  spawn: BugSpawnMethod[];
  dungeon_biome?: DungeonBiome;
};
