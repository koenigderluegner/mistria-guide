import type { FormControl } from '@angular/forms';
import { Season, Weather } from '@mistria-guide/data-types';

export type DashboardFilterData = {
  day: number;
  season: Season;
  year: number;
  weather: Weather;
  hideCompleted: boolean;
  onlyMuseumRelated: boolean;
};

export type DashboardFilter = {
  [key in keyof DashboardFilterData]: FormControl<DashboardFilterData[key]>;
};
