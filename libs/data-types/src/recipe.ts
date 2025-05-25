export type RawRecipe = {
  recipe_is_default?: true;
  crafting_level_requirement?: number;
  recipe_key?: string;
  recipe: (
    | {
        count: number;
        item: string;
      }
    | {
        hours: number;
        minutes: number;
      }
  )[];
};

export function transformRecipe(recipe: RawRecipe): Recipe {
  const duration = recipe.recipe.find((r) => 'minutes' in r);

  if (!duration) throw new Error('duration not found');

  return {
    level_requirement: recipe.crafting_level_requirement,
    ingredients: recipe.recipe.filter((r) => 'item' in r),
    duration,
  };
}

export type Recipe = {
  level_requirement?: number;
  duration: {
    hours: number;
    minutes: number;
  };
  ingredients?: {
    count: number;
    item: string;
  }[];
};
