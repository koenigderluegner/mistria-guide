import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  untracked,
} from '@angular/core';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardFilter } from './dashboard-filter/dashboard-filter.type';
import { Dashboard, Season, Weather } from '@mistria-guide/data-types';
import { httpResource } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListEntryItemComponent } from '../shared/list-entry-item/list-entry-item.component';
import { UserDataService } from '../user-data/user-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardFilterComponent,
    ListEntryItemComponent,
    MatProgressSpinner,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  data = httpResource<Dashboard>(() => 'database/dashboard.json');
  userData = inject(UserDataService);
  userDataFilter = computed(() => {
    return this.userData.currentData().dashboardFilter;
  });

  userDataReadOnce = signal(false);

  fromGroup: FormGroup<DashboardFilter> = new FormGroup<DashboardFilter>({
    season: new FormControl<Season>(this.userDataFilter().season ?? 'spring', {
      nonNullable: true,
    }),
    weather: new FormControl<Weather>(this.userDataFilter().weather ?? 'calm', {
      nonNullable: true,
    }),
    day: new FormControl<number>(this.userDataFilter().day ?? 1, {
      nonNullable: true,
    }),
    year: new FormControl<number>(this.userDataFilter().year ?? 1, {
      nonNullable: true,
    }),
    hideCompleted: new FormControl<boolean>(
      this.userDataFilter().hideCompleted ?? true,
      { nonNullable: true }
    ),
  });
  injector = inject(Injector);
  filterValues = runInInjectionContext(this.injector, () =>
    toSignal(
      this.fromGroup.valueChanges.pipe(
        map(() => this.fromGroup.getRawValue()),
        tap((v) => {
          this.userData.currentData().dashboardFilter = v;
          this.userData.save();
        })
      ),
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

  constructor() {
    effect(() => {
      const filterData = this.userDataFilter();
      if (filterData)
        untracked(() => {
          this.fromGroup.patchValue(filterData);
        });
    });
    afterNextRender(() => {
      // avoid flickering of filter because localstorage hasn't been rendered
      this.userDataReadOnce.set(true);
    });
  }
}
