export const DungeonIds = ['upper-mines','the-tide-caverns','deep-earth','the-lava-caves','ancient-ruins'] as const;

export type DungeonId = typeof DungeonIds[number];