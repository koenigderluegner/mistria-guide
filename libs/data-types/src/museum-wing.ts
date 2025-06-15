import { IconSprite, WingId, WingSetId } from './generated';
import { TranslationReference } from './translation-reference';
import { MuseumWingSet } from './museum-wing-set';

export type MuseumWing = {
  wing: WingId;
  icon_key: IconSprite;
  sets: Record<WingSetId, MuseumWingSet>;
  name: TranslationReference;
};
