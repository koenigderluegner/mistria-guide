export const WingIds = ['archaeology', 'fish', 'flora', 'insect'] as const;

export type WingId = (typeof WingIds)[number];
