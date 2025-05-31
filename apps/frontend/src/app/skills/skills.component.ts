import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Skill, SkillId } from '@mistria-guide/data-types';
import { JsonPipe } from '@angular/common';
import { SpriteComponent } from '../shared/sprite/sprite.component';

@Component({
  selector: 'app-skills',
  imports: [JsonPipe, SpriteComponent],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  itemId = input<string>();
  item = httpResource<Record<SkillId, Skill>>('/database/skills.json');
}
