export const DungeonBiomes = [
  'upper',
  'tide_caverns',
  'deep_earth',
  'lava_caves',
] as const;

export type DungeonBiome = typeof DungeonBiomes[number];
