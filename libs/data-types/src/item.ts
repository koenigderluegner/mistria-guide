import { TranslationReference } from './translation-reference';
import { RawRecipe, Recipe, transformRecipe } from './recipe';
import { IconSprite, ItemId, Quality, Tag, ToolType } from './generated';

export type RawItem = {
  name: TranslationReference;
  description: TranslationReference;
  icon_sprite: IconSprite;
  tags: Tag[];

  object: string;

  quality?: Quality;
  tool_type: ToolType;
  damage?: number;
  range?: number;

  value: {
    bin: string | number;
    store?: number;
  };
} & RawRecipe;

export function transformItem(item: RawItem, id: ItemId): Item {
  const res: Item = {
    id,
    description: item.description,
    name: item.name,
    icon_sprite: item.icon_sprite,
    tags: item.tags,
    value: item.value,
  };
  if ('recipe' in item) {
    res.recipe = transformRecipe(item);
  }
  return res;
}

export type Item = {
  id: ItemId;
  name: TranslationReference;
  description: TranslationReference;
  icon_sprite: IconSprite;
  tags: string[];
  recipe?: Recipe;
  value: {
    bin: string | number;
    store?: number;
  };
};
