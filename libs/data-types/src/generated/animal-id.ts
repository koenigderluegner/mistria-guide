export const AnimalIds = [
  'horse',
  'cow',
  'chicken',
  'capybara',
  'alpaca',
  'rabbit',
  'sheep',
  'duck',
] as const;

export type AnimalId = (typeof AnimalIds)[number];
