import { ItemId } from './generated';

export function transformDungeon(rawBug: Biome): Dungeon {
  const { junk, breakable, seam_rock, small_rock, ...votes } = rawBug.votes;
  return {
    id: rawBug.name.toLowerCase().replaceAll(' ', '-'),
    name: rawBug.name,
    artifact_set: rawBug.artifact_set,
    ore: rawBug.ore,
    gem: rawBug.gem,
    combat_xp_gain: rawBug.combat_xp_gain,
    startingFloor: rawBug.floor,
    cosmetics: rawBug.cosmetics,
    armor: rawBug.armor,
    furniture: rawBug.furniture,
    dungeon_delicacies: rawBug.dungeon_delicacies,
    taste_maker: rawBug.taste_maker,
    shrine: rawBug.shrine,
    votes,
  };
}

export type Dungeon = {
  id: string;
  name: string;
  startingFloor: number;
  artifact_set: string;
  ore: string;
  gem: string;
  combat_xp_gain: number;
  cosmetics: ItemId[];
  armor: ItemId[];
  furniture: ItemId[];
  dungeon_delicacies: string[];
  taste_maker: string[];
  shrine: Shrine;
  votes: Omit<Votes, 'breakable' | 'junk' | 'small_rock' | 'seam_rock'>;
};

interface Dungeons {
  dungeons: {
    biomes: Biome[];
  };
  misc: MiscConfig;
}

interface Biome {
  name: string;
  floor: number;
  asset_insert: string;
  music: string;
  artifact_set: string;
  ore: string;
  gem: string;
  combat_xp_gain: number;
  ladder_chance_range: [number, number];
  monster_element_points: number;
  object_element_points: number;
  cosmetics: ItemId[];
  armor: ItemId[];
  furniture: ItemId[];
  dungeon_delicacies: ItemId[];
  taste_maker: ItemId[];
  shrine: Shrine;
  votes: Votes;
}

export type Shrine = {
  inputs: ShrineInput[];
  outputs: ShrineOutputs;
};

export type ShrineInput = {
  item_id: ItemId;
  amount: number;
};

export type ShrineOutputs = {
  health: number;
  stamina: number;
  essence: number;
};

interface Votes {
  junk: VoteItem[];
  breakable: VoteItem[];
  chest: VoteItem[];
  enemy: VoteItem[];
  large_rock: VoteItem[];
  ore_rock: VoteItem[];
  small_rock: VoteItem[];
  seam_rock: VoteItem[];
  fish: VoteItem[];
  bug: VoteItem[];
  forageable: VoteItem[];
  water_forageable?: VoteItem[];
}

export interface VoteItem {
  object: string;
  votes?: number;
}

interface MiscConfig {
  max_floors: number;
  elevator_frequency: number;
  ladder_spawn_modifier: number;
  ground_variant_chance: number;
  chance_tiles: number[];
  impl_dampening: number;
  impl_dampening_decay: number;
  bug_count: [number, number];
  corner_tiles: CornerTiles;
}

interface CornerTiles {
  bottom_left: number[];
  bottom_right: number[];
  top_left: number[];
  top_right: number[];
}
