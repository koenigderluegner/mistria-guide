export const BugAttractions = ["none","light","copper","crystal_berries"] as const;

export type BugAttraction = typeof BugAttractions[number];