export const BugSpawnMethods = ['default','canopy','grass','rock'] as const;

export type BugSpawnMethod = typeof BugSpawnMethods[number];