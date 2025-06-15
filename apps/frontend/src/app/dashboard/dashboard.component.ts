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
import { Season, Weather, WingSetId } from '@mistria-guide/data-types';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListEntryItemComponent } from '../shared/list-entry-item/list-entry-item.component';
import { UserDataService } from '../user-data/user-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatabaseService } from '../core/database.service';

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
  #database = inject(DatabaseService);
  wings = this.#database.getMuseumWings();
  data = this.#database.getDashboard();
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
    onlyMuseumRelated: new FormControl<boolean>(
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
    const { season, weather, onlyMuseumRelated } = filterValue;

    let bugs = this.data.value()?.bugs ?? [];
    if (onlyMuseumRelated) {
      const value = this.wings.value();
      if (value) {
        const sets = value.insect.sets;
        const museumBugs = (Object.keys(sets) as WingSetId[])
          .map((setKey) => sets[setKey].items)
          .flat();
        bugs = bugs.filter((b) => museumBugs.includes(b.id));
      }
    }
    return bugs.filter((f) => {
      return (
        f.seasons.includes(season) &&
        (f.weather.includes(weather) || !f.weather.length)
      );
    });
  });

  fish = computed(() => {
    const filterValue = this.filterValues();
    const { season, weather, onlyMuseumRelated } = filterValue;

    let fish = this.data.value()?.fish ?? [];
    if (onlyMuseumRelated) {
      const value = this.wings.value();
      if (value) {
        const sets = value.fish.sets;
        const museumFish = (Object.keys(sets) as WingSetId[])
          .map((setKey) => sets[setKey].items)
          .flat();
        fish = fish.filter((b) => museumFish.includes(b.id));
      }
    }

    return fish.filter((f) => {
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
