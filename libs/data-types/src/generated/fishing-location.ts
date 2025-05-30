export const FishingLocations = ['deep_woods'] as const;

export type FishingLocation = typeof FishingLocations[number];