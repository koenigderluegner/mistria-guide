import { Component, input } from '@angular/core';
import { IconSprite } from '@mistria-guide/data-types';

@Component({
  selector: 'app-sprite',
  imports: [],
  templateUrl: './sprite.component.html',
  host: {
    class: 'inline-block',
  },
})
export class SpriteComponent {
  name = input.required<IconSprite>();
}
