import { Component, computed, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Perk, Skill, SkillId, SkillIds } from '@mistria-guide/data-types';
import { SpriteComponent } from '../shared/sprite/sprite.component';
import { CapitalizeFirstLetterPipe } from '../shared/util/capitalize-first-letter-pipe';
import { PageNavigation } from '../page/page-navigation/page-navigation';
import { PageNavigationLink } from '../page/page-navigation-link/page-navigation-link';
import { Page } from '../page/page';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';

@Component({
  selector: 'app-skills',
  imports: [
    SpriteComponent,
    CapitalizeFirstLetterPipe,
    PageNavigation,
    PageNavigationLink,
    Page,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmCardHeaderDirective,
  ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skillId = input<SkillId>();
  protected skills = httpResource<Record<SkillId, Skill>>(
    () => 'database/skills.json'
  );
  protected skillLinks = SkillIds.map((skillId) => ({
    link: '/skills/' + skillId,
    name: skillId,
  }));
  protected foundSkill = computed(() => {
    if (!this.skills.hasValue()) return undefined;

    const keys = Object.keys(this.skills.value()) as SkillId[];
    const skillId = this.skillId();
    const shownSkillId =
      skillId && SkillIds.includes(skillId) ? skillId : keys[0];
    return this.skills.value()[shownSkillId];
  });

  tiers = computed<Perk[][]>(() => {
    const skill = this.foundSkill();
    if (!skill) return [];
    const tierKeys = Object.keys(skill)
      .filter((key) => key.startsWith('tier'))
      .sort();
    // @ts-expect-error cant be index with type string, TODO fix
    return tierKeys.map((key) => skill[key] as Perk[]);
  });
}
