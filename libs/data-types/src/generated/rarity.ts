export const Rarities = ["c","o","m","n","v","e","r","y","_","a","u","k","i","d"] as const;

export type Rarity = typeof Rarities[number];