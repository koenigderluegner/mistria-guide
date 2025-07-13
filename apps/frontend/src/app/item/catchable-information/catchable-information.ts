import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Bug, Fish } from '@mistria-guide/data-types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-catchable-information',
  imports: [TitleCasePipe],
  templateUrl: './catchable-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-1',
  },
})
export class CatchableInformation {
  catchable = input.required<Fish | Bug>();
}
