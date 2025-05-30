export const Weathers = ["calm","special","inclement","heavy_inclement"] as const;

export type Weather = typeof Weathers[number];