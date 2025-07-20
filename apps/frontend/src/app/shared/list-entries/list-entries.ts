import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-entries',
  imports: [],
  templateUrl: './list-entries.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex gap-2 flex-wrap',
  },
})
export class ListEntries {}
