export const SkillIds = [
  'archaeology',
  'blacksmithing',
  'cooking',
  'farming',
  'fishing',
  'ranching',
  'woodcrafting',
  'combat',
  'mining',
] as const;

export type SkillId = (typeof SkillIds)[number];
