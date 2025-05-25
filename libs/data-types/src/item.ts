import { TranslationReference } from './translation-reference';
import { RawRecipe, Recipe, transformRecipe } from './recipe';

export type RawItem = {
  name: TranslationReference;
  description: TranslationReference;
  icon_sprite: string;
  tags: string[];

  object: string;

  quality?: string; // enum?
  tool_type: string; // enum?
  damage?: number;
  range?: number;

  value: {
    bin: string | number;
    store?: number;
  };
} & RawRecipe;

export function transformItem(item: RawItem): Item {
  const res: Item = {
    description: item.description,
    name: item.name,
    icon_sprite: item.icon_sprite,
    tags: item.tags,
    value: item.value,
  };
  if('recipe' in item){
    res.recipe = transformRecipe(item);
  }
  return res;
}

export type Item = {
  name: TranslationReference;
  description: TranslationReference;
  icon_sprite: string;
  tags: string[];
  recipe?: Recipe;
  value: {
    bin: string | number;
    store?: number;
  };
};
