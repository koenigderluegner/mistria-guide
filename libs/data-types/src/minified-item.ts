import { IconSprite, ItemId } from './generated';
import { TranslationReference } from './translation-reference';

export type MinifiedItem = {
  id: ItemId;
  name: TranslationReference;
  icon_sprite: IconSprite;
};
