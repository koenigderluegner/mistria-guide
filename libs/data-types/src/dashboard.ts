import { ItemId, Season, Weather } from './generated';
import { MinifiedItem } from './minified-item';

type WeatherAndSeasonDependant = {
  id: ItemId;
  item: MinifiedItem;
  seasons: Season[];
  weather: Weather[];
};

export type Dashboard = {
  bugs: WeatherAndSeasonDependant[];
  fish: WeatherAndSeasonDependant[];
};
