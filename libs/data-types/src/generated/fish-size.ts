export const FishSizes = ['medium', 'large', 'small', 'giant'] as const;

export type FishSize = (typeof FishSizes)[number];
