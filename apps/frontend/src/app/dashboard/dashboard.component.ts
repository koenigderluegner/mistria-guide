import {
  Component,
  computed,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardFilter } from './dashboard-filter/dashboard-filter.type';
import { Dashboard, Season, Weather } from '@mistria-guide/data-types';
import { httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListEntryItemComponent } from '../shared/list-entry-item/list-entry-item.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardFilterComponent, ListEntryItemComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  data = httpResource<Dashboard>(() => 'database/dashboard.json');

  fromGroup: FormGroup<DashboardFilter> = new FormGroup<DashboardFilter>({
    season: new FormControl<Season>('spring', { nonNullable: true }),
    weather: new FormControl<Weather>('calm', { nonNullable: true }),
    day: new FormControl<number>(1, { nonNullable: true }),
    year: new FormControl<number>(1, { nonNullable: true }),
    hideCompleted: new FormControl<boolean>(true, { nonNullable: true }),
  });
  injector = inject(Injector);
  filterValues = runInInjectionContext(this.injector, () =>
    toSignal(
      this.fromGroup.valueChanges.pipe(map(() => this.fromGroup.getRawValue())),
      { initialValue: this.fromGroup.getRawValue() }
    )
  );

  bugs = computed(() => {
    const filterValue = this.filterValues();
    const season: Season = filterValue.season;
    const weather: Weather = filterValue.weather;

    return (this.data.value()?.bugs ?? []).filter((f) => {
      return (
        f.seasons.includes(season) &&
        (f.weather.includes(weather) || !f.weather.length)
      );
    });
  });

  fish = computed(() => {
    const filterValue = this.filterValues();
    const season: Season = filterValue.season;
    const weather: Weather = filterValue.weather;

    return (this.data.value()?.fish ?? []).filter((f) => {
      return (
        f.seasons.includes(season) &&
        (f.weather.includes(weather) || !f.weather.length)
      );
    });
  });
}
