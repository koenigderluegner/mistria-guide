import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page {

}
