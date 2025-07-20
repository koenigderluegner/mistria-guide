import { DungeonId, ItemId } from './generated';
import { MinifiedItem } from './minified-item';

export type Dungeon = {
  id: DungeonId;
  name: string;
  startingFloor: number;
  artifact_set: string;
  ore: MinifiedItem;
  gem: MinifiedItem;
  combat_xp_gain: number;
  // cosmetics: MinifiedItem[];
  armor: MinifiedItem[];
  furniture: MinifiedItem[];
  dungeon_delicacies: MinifiedItem[];
  taste_maker: MinifiedItem[];
  shrine: Shrine;
  bugs: MinifiedItem[];
  fish: MinifiedItem[];
  forageable: MinifiedItem[];
  water_forageable: MinifiedItem[];
  votes: Omit<
    Votes,
    | 'breakable'
    | 'junk'
    | 'small_rock'
    | 'seam_rock'
    | 'fish'
    | 'bug'
    | 'forageable'
  >;
};

export interface Dungeons {
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
  ore: ItemId;
  gem: ItemId;
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
  object: ItemId;
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
