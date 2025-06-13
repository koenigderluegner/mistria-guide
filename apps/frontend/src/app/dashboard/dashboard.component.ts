import { Component } from '@angular/core';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardFilter } from './dashboard-filter/dashboard-filter.type';
import { Season, Weather } from '@mistria-guide/data-types';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardFilterComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  fromGroup: FormGroup<DashboardFilter> = new FormGroup<DashboardFilter>({
    season: new FormControl<Season>('spring', { nonNullable: true }),
    weather: new FormControl<Weather>('calm', { nonNullable: true }),
    day: new FormControl<number>(1, { nonNullable: true }),
    year: new FormControl<number>(1, { nonNullable: true }),
    hideCompleted: new FormControl<boolean>(true, { nonNullable: true }),
  });
}
