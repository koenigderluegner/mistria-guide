import { Component, computed, inject, input } from '@angular/core';
import {
  MinifiedItem,
  MuseumWing,
  WingId,
  WingIds,
} from '@mistria-guide/data-types';
import { httpResource } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { SpriteComponent } from '../shared/sprite/sprite.component';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { ListEntryItemComponent } from '../shared/list-entry-item/list-entry-item.component';
import { MuseumChecklist } from '../core/museum-checklist';

@Component({
  selector: 'app-museum',
  imports: [
    SpriteComponent,
    KeyValuePipe,
    HlmCardDirective,
    ListEntryItemComponent,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardTitleDirective,
    HlmCardHeaderDirective,
  ],
  templateUrl: './museum.html',
})
export class Museum {
  museumChecklist = inject(MuseumChecklist);
  wingId = input<WingId>();
  protected wings = httpResource<Record<WingId, MuseumWing>>(
    () => 'database/museum-wings.json'
  );
  protected foundWing = computed(() => {
    if (!this.wings.hasValue()) return undefined;

    const keys = Object.keys(this.wings.value()) as WingId[];
    const wingId = this.wingId();
    const shownSkillId = wingId && WingIds.includes(wingId) ? wingId : keys[0];
    return this.wings.value()[shownSkillId];
  });

  setChecklistStatus(item: MinifiedItem, checked: boolean) {
    if (checked) {
      this.museumChecklist.add(item.id);
    } else {
      this.museumChecklist.remove(item.id);
    }
  }
}
