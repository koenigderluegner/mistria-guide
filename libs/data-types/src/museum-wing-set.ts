import { WingSetId } from './generated';
import { TranslationReference } from './translation-reference';
import { MinifiedItem } from './minified-item';

export type MuseumWingSet = {
  orderId: string;
  setId: WingSetId;
  name: TranslationReference;
  description: TranslationReference;
  items: MinifiedItem[];
};
