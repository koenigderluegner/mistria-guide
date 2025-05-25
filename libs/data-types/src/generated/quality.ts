export const Qualities = ["tier1","tier2","tier3","tier4","tier5","tier6"] as const;

export type Quality = typeof Qualities[number];