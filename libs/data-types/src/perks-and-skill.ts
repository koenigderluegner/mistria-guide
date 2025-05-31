import { TranslationReference } from './translation-reference';
import { IconSprite, PerkId } from './generated';

export type Perk = {
  perk: PerkId;
  name: TranslationReference;
  description: TranslationReference;
  essence: number;
  icon: IconSprite;
};

export type Skill = {
  name: TranslationReference;
  icon_sprite_key: IconSprite;
} & Record<`tier_${number}`, Perk[]>;
