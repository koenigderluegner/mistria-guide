export const Seasons = ["spring","summer","fall","winter"] as const;

export type Season = typeof Seasons[number];