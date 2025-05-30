export const BugLikedObjectCategories = ["grass","crop","bush","tree","stump","rock","breakable","building"] as const;

export type BugLikedObjectCategory = typeof BugLikedObjectCategories[number];