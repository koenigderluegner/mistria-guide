import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Dashboard, MuseumWing, WingId } from '@mistria-guide/data-types';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  getData<T>(key: string) {
    return httpResource<T>(() => `/database/${key}.json`);
  }

  getMuseumWings() {
    return this.getData<Record<WingId, MuseumWing>>('museum-wings');
  }

  getDashboard() {
    return this.getData<Dashboard>('dashboard');
  }
}
