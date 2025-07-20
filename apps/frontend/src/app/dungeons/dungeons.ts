import { Component, computed, inject, input } from '@angular/core';
import {
  Dungeon,
  DungeonId,
  DungeonIds,
  MinifiedItem,
} from '@mistria-guide/data-types';
import { httpResource } from '@angular/common/http';
import { MuseumChecklist } from '../core/museum-checklist';
import { PageNavigation } from '../page/page-navigation/page-navigation';
import { CapitalizeFirstLetterPipe } from '../shared/util/capitalize-first-letter-pipe';
import { Page } from '../page/page';
import { PageNavigationLink } from '../page/page-navigation-link/page-navigation-link';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { ListEntries } from '../shared/list-entries/list-entries';
import { ListEntryItemComponent } from '../shared/list-entry-item/list-entry-item.component';

@Component({
  selector: 'app-dungeons',
  imports: [
    PageNavigation,
    CapitalizeFirstLetterPipe,
    Page,
    PageNavigationLink,
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    ListEntries,
    ListEntryItemComponent,
    HlmCardDescriptionDirective,
  ],
  templateUrl: './dungeons.html',
})
export class Dungeons {
  museumChecklist = inject(MuseumChecklist);
  dungeonId = input<DungeonId>();
  protected dungeons = httpResource<Record<DungeonId, Dungeon>>(
    () => 'database/dungeons.json'
  );
  protected foundDungeon = computed(() => {
    if (!this.dungeons.hasValue()) return undefined;

    const keys = Object.keys(this.dungeons.value()) as DungeonId[];
    const wingId = this.dungeonId();
    const shownSkillId =
      wingId && DungeonIds.includes(wingId) ? wingId : keys[0];
    return this.dungeons.value()[shownSkillId];
  });
  protected dungeonLinks = computed(() => {
    const dungeons = this.dungeons.value();
    if (!dungeons) return [];
    return DungeonIds.map((dungeonId) => ({
      link: '/dungeons/' + dungeonId,
      name: dungeons[dungeonId].name,
    }));
  });

  setMuseumChecklistStatus(item: MinifiedItem, checked: boolean) {
    if (checked) {
      this.museumChecklist.add(item.id);
    } else {
      this.museumChecklist.remove(item.id);
    }
  }
}
