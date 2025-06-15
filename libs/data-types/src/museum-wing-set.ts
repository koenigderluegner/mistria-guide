import { ItemId, WingSetId } from './generated';
import { TranslationReference } from './translation-reference';

export type MuseumWingSet = {
  orderId: string;
  setId: WingSetId;
  name: TranslationReference;
  description: TranslationReference;
  items: ItemId[];
};
