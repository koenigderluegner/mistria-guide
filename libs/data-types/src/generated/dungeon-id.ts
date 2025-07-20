export const DungeonIds = ['upper_mines','the_tide_caverns','deep_earth','the_lava_caves','ancient_ruins'] as const;

export type DungeonId = typeof DungeonIds[number];