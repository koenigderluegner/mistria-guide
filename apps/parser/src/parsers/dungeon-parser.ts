import {
  Dungeon,
  DungeonId,
  Dungeons,
  ItemId,
} from '@mistria-guide/data-types';
import { ItemMinifier } from '../item-minifier/item-minifier';
import { TypesGenerator } from '../types-generator/types-generator';
import { bugParser } from './bug-parser';

export function dungeonParser(
  dungeons: Dungeons,
  bugDb: ReturnType<typeof bugParser>
) {
  const dungeonIds: string[] = [];
  const dungeonMap = {} satisfies Record<string, Dungeon>;
  const dungeonBugs = (Object.keys(bugDb) as ItemId[])
    .filter((id) => 'dungeon_biome' in bugDb[id])
    .map((id) => ({ ...bugDb[id], id }));

  dungeons.dungeons.biomes.forEach((biome) => {
    const { junk, breakable, seam_rock, small_rock, ...votes } = biome.votes;

    const id = biome.name.toLowerCase().replaceAll(' ', '_') as DungeonId;
    dungeonIds.push(id);

    const dungeonBugIds = votes.bug.map((id) => id.object);
    const bugDbIds = dungeonBugs
      .filter((bug) => bug.dungeon_biome && id.includes(bug.dungeon_biome))
      .map((bug) => bug.id);
    const bugIds = new Set([...dungeonBugIds, ...bugDbIds]);
    const bugs = [...bugIds].map((id) => ItemMinifier.getMinifiedItem(id));

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
      taste_maker: biome.taste_maker.map((id) =>
        ItemMinifier.getMinifiedItem(id)
      ),
      shrine: biome.shrine,
      bugs,
      fish: votes.fish.map((id) => ItemMinifier.getMinifiedItem(id.object)),
      forageable: votes.forageable.map((id) =>
        ItemMinifier.getMinifiedItem(id.object)
      ),
      water_forageable: (votes.water_forageable ?? []).map((id) =>
        ItemMinifier.getMinifiedItem(id.object)
      ),
      votes,
    } satisfies Dungeon;
  });

  TypesGenerator.addEnum([...new Set(dungeonIds)], 'DungeonId');

  return dungeonMap;
}
