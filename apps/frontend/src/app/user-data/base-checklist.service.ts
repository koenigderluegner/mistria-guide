import { inject, Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { Checklist } from './checklist';

@Injectable()
export abstract class BaseChecklistService {
  protected static _TO_DO_STORE_KEY = 'checklist_';
  protected readonly userData = inject(UserDataService);

  protected constructor(protected checklistName: string) {
    if (checklistName.trim() === '')
      throw new Error(`checklistName can't be empty!`);
  }

  save(): void {
    this.userData.save();
  }

  getCurrentChecklist(): Checklist {
    let checklist = this.userData.currentData().checklists[this.checklistName];

    if (!checklist) {
      checklist = this.userData.addChecklist(this.checklistName);
    }
    return checklist;
  }

  set(entry: string | string[]): void {
    this.getCurrentChecklist().entries = [
      ...new Set([...(Array.isArray(entry) ? entry : [entry])]),
    ];
    this.save();
  }

  add(entry: string | string[]): void {
    this.getCurrentChecklist().entries = [
      ...new Set([
        ...this.getCurrentChecklist().entries,
        ...(Array.isArray(entry) ? entry : [entry]),
      ]),
    ];
    this.save();
  }

  remove(entry: string | string[]): void {
    if (!Array.isArray(entry)) {
      entry = [entry];
    }

    this.getCurrentChecklist().entries =
      this.getCurrentChecklist().entries.filter((e) => !entry.includes(e));
    this.save();
  }

  isChecked(value: string): boolean {
    return this.getCurrentChecklist().entries.includes(value);
  }

  getChecklistStorageKey(): string {
    return BaseChecklistService._TO_DO_STORE_KEY + this.checklistName;
  }
}
