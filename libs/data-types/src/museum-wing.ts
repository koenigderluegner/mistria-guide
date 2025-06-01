import { IconSprite, ItemId, WingId, WingSetId } from './generated';
import { TranslationReference } from './translation-reference';

export type MuseumWing = {
  wing: WingId;
  icon_key: IconSprite;
  sets: Record<
    WingId,
    {
      orderId: string;
      setId: WingSetId;
      name: TranslationReference;
      description: TranslationReference;
      items: ItemId[];
    }
  >;
  name: TranslationReference;
};
