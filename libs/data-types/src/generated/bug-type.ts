export const BugTypes = ["fly_wave","crawl","jump","fly"] as const;

export type BugType = typeof BugTypes[number];