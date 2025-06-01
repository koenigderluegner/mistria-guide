export type RawAnimal = {
  core: {
    name: string;
    plural_name: string;
    female_other: string;
    male_other: string;
    new_baby_born: string;
    size: 'large' | string;
    default_icon_variant: string;
    cosmetic_sub_icon: string;
    progression_requirement?: string;
  };
  behavior: {
    can_wander_in_home: boolean;
  };
  celebration_data: {
    baby_animation: string;
    adult_animation: string;
  };
  production: {
    male: ProductionData;
    female: ProductionData;
  };
  breeding: {
    uses_egg: boolean;
    treat: string;
  };
  eating: {
    kind: string;
    offset: [number, number];
    baby_offset: [number, number];
    shake_frames: [number, number];
  };
  petting: {
    kind: string;
  };
  pricing: {
    buy_price: number;
    baby_sell_price: number;
    adult_sell_prices: number[];
  };
  mounting: {
    is_mount: boolean;
  };
  bark_offsets: {
    adult: DirectionalOffsets;
    baby: DirectionalOffsets;
  };
  sounds: {
    baby: SoundSet[];
    adult: SoundSet[];
  };
  animations: {
    [animationType: string]: AnimationConfig;
  };
  variants: {
    [variantName: string]: VariantConfig;
  };
  cosmetics: {
    [cosmeticName: string]: CosmeticConfig;
  };
};

type ProductionData = {
  days_to_produce: number;
  normal_product: string;
  golden_product: string;
};

type DirectionalOffsets = {
  north: [number, number];
  south: [number, number];
  east: [number, number];
  west: [number, number];
};

type SoundSet = {
  ambient: string;
  positive_react: string;
  negative_react: string;
};

type AnimationConfig = {
  randomly_selected?: boolean;
  duration?: [number, number];
  play_ambient_sounds?: boolean;
  end_with_animation?: boolean;
  valid_for?: string[];
  player_offsets?: {
    [direction: string]: [number, number][];
  };
};

type VariantConfig = {
  name?: string;
  lut?: string;
  lut_index?: number;
  default_unlocked?: boolean;
  tier?: number;
  born_in?: string;
  default_cosmetic?: string;
  acquirable?: boolean;
  male?: CharacterConfig;
  female?: CharacterConfig;
  baby?: {
    key: string;
    top_key?: string;
  };
};

type CharacterConfig = {
  key: string;
  ui_key: string;
  top_key: string;
};

type CosmeticConfig = {
  name?: string;
  male?: {
    key: string;
    top_key: string;
  };
  female?: {
    key: string;
    top_key: string;
  };
};

export type Animal = Omit<
  RawAnimal,
  'animations' | 'bark_offsets' | 'behavior' | 'celebration_data'
>;

export function transformAnimal(
  rawBug: RawAnimal,
  defaultBug: RawAnimal
): Animal {
  const { animations, bark_offsets, behavior, celebration_data, ...animal } = {
    ...defaultBug,
    ...rawBug,
  };

  return animal;
}
