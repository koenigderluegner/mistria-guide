import { Dungeon, DungeonId, Dungeons } from '@mistria-guide/data-types';
import { ItemMinifier } from '../item-minifier/item-minifier';
import { TypesGenerator } from '../types-generator/types-generator';

export function dungeonParser(dungeons: Dungeons) {
  const dungeonIds: string[] = [];
  const dungeonMap = {} satisfies Record<DungeonId, Dungeon>;
  dungeons.dungeons.biomes.forEach((biome) => {
    const { junk, breakable, seam_rock, small_rock, ...votes } = biome.votes;
    const id = biome.name.toLowerCase().replaceAll(' ', '-');
    dungeonIds.push(id);
    dungeonMap[id] = {
      id: id,
      name: biome.name,
      artifact_set: biome.artifact_set,
      ore: ItemMinifier.getMinifiedItem(biome.ore),
      gem: ItemMinifier.getMinifiedItem(biome.gem),
      combat_xp_gain: biome.combat_xp_gain,
      startingFloor: biome.floor,
      // cosmetics: biome.cosmetics.map((id) => ItemMinifier.getMinifiedItem(id)),
      armor: biome.armor.map((id) => ItemMinifier.getMinifiedItem(id)),
      furniture: biome.furniture.map((id) => ItemMinifier.getMinifiedItem(id)),
      dungeon_delicacies: biome.dungeon_delicacies.map((id) =>
        ItemMinifier.getMinifiedItem(id)
      ),
      taste_maker: [],
      shrine: biome.shrine,
      votes,
    };
  });

  TypesGenerator.addEnum([...new Set(dungeonIds)], 'DungeonId');
  return dungeonMap;
}
