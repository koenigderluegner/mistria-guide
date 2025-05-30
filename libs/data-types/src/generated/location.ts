export const Locations = ['beach','narrows','eastern_road','town','deep_woods'] as const;

export type Location = typeof Locations[number];