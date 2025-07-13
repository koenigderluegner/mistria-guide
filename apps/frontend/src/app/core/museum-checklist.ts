import { Injectable } from '@angular/core';
import { BaseChecklistService } from '../user-data/base-checklist.service';

@Injectable({
  providedIn: 'root',
})
export class MuseumChecklist extends BaseChecklistService {
  constructor() {
    super('museum');
  }
}
