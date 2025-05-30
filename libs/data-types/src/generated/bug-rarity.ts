export const BugRarities = ['common','very_rare','rare','uncommon','kinda_rare'] as const;

export type BugRarity = typeof BugRarities[number];