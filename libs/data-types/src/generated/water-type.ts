export const WaterTypes = ['river','pond','ocean'] as const;

export type WaterType = typeof WaterTypes[number];