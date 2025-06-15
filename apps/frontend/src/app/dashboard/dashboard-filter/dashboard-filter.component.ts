import { Component, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { DashboardFilter } from './dashboard-filter.type';
import { Seasons, Weathers } from '@mistria-guide/data-types';
import { addDays } from '../../shared/util/specific-date.function';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-filter',
  imports: [
    FormsModule,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatCheckbox,
    MatInput,
    TitleCasePipe,
  ],
  templateUrl: './dashboard-filter.component.html',
})
export class DashboardFilterComponent {
  readonly parentFormGroup = input.required<FormGroup<DashboardFilter>>();
  protected readonly Weathers = Weathers;
  protected readonly Seasons = Seasons;

  increaseDay(daysToAdd: number) {
    this.parentFormGroup().patchValue(
      addDays(this.parentFormGroup().getRawValue(), daysToAdd)
    );
  }
}
