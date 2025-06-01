type GameConfig = {
  name_max_width: number;
  treat_sparkle_frequency: [number, number];
  min_heart_level_for_breeding: number;
  default_male_names: string[];
  default_female_names: string[];
  heart_point_table: number[];
  production_tiers: ProductionTier[];
  heart_points: HeartPoints;
  xp: XPConfig;
  festival_scoring: FestivalScoring;
};

type ProductionTier = {
  hearts_required: number;
  normal: {
    count: number;
    additional_chance: number;
  };
  golden: {
    count: number;
    additional_chance: number;
  };
};

type HeartPoints = {
  pet: number;
  feed: number;
  go_outside: number;
  left_outside_penalty: number;
  normal_feed_bonus: number;
  quality_feed_bonus: number;
  deluxe_feed_bonus: number;
  ultimate_feed_bonus: number;
  crop_bonus: number;
  cooked_star_bonuses: number[];
  child_born: number;
  toy: number;
};

type XPConfig = {
  pet: number;
  feed: number;
  go_outside: number;
  gain_heart: number;
  breed: number;
};

type FestivalScoring = {
  tier: number[];
  heart: number[];
};
