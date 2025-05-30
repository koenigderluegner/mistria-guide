export const FishingRarities = ['wood_chest','copper_chest','silver_chest','gold_chest','junk','very_common','ultra_common','common','uncommon','rare','very_very_common','artifact_divespots','artifact_fishing'] as const;

export type FishingRarity = typeof FishingRarities[number];