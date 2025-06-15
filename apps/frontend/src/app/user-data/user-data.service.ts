import {
  computed,
  effect,
  inject,
  Injectable,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { LocalStorageService } from '../core/local-storage.service';
import { UserData } from './user-data.type';
import { Checklist } from './checklist';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private static readonly _CURRENT_USER_DATA_VERSION = 1;
  private static readonly _USER_DATA_STORE_KEY = 'user-data';
  private static readonly _SAVE_GAME_NAME_PREFIX = 'Save game ';
  userData = signal<{
    version: number;
    currentIndex: number;
    data: UserData[];
  }>({
    version: UserDataService._CURRENT_USER_DATA_VERSION,
    currentIndex: -1,
    data: [],
  });
  currentIndex = linkedSignal(() => this.userData().currentIndex);
  readonly #localStorage = inject(LocalStorageService);
  #currentData = computed(() => this.userData().data[this.currentIndex()]);

  constructor() {
    effect(() => {
      const index = this.currentIndex();
      untracked(() => {
        this.userData().currentIndex = index;
        this.save();
      });
    });
  }

  get currentData() {
    return this.#currentData;
  }

  save(): void {
    this.#localStorage.setItem(
      UserDataService._USER_DATA_STORE_KEY,
      JSON.stringify(this.userData())
    );
  }

  read(): void {
    const userData = this.#localStorage.getItem(
      UserDataService._USER_DATA_STORE_KEY
    );
    if (userData) {
      const parsedJSON = JSON.parse(userData);
      this.userData.set(parsedJSON);
    } else {
      this.userData.set({
        version: UserDataService._CURRENT_USER_DATA_VERSION,
        currentIndex: 0,
        data: [this.createEmptyUserData()],
      });
      this.save();
    }
  }

  delete(index?: number) {
    const indexToDelete = index ?? this.currentIndex();

    this.currentIndex.update((index) => Math.max(0, index - 1));

    // let signals settle
    setTimeout(() => {
      this.userData().data.splice(indexToDelete, 1);
      this.save();
    }, 0);
  }

  createEmptyUserData(name?: string): UserData {
    return {
      name: name ?? this.#getNextName(),
      dashboardFilter: {
        year: 1,
        day: 1,
        season: 'spring',
        weather: 'calm',
        hideCompleted: true,
        onlyMuseumRelated: true,
      },
      checklists: {},
    };
  }

  #getNextName(): string {
    const names = new Set(this.userData().data.map((d) => d.name));
    let currentIndex = this.userData().data.length + 1;

    while (names.has(UserDataService._SAVE_GAME_NAME_PREFIX + currentIndex)) {
      currentIndex++;
    }

    return UserDataService._SAVE_GAME_NAME_PREFIX + currentIndex;
  }

  addChecklist(name: string): Checklist {
    this.currentData().checklists[name] = this.#createEmptyChecklist();
    this.save();
    return this.currentData().checklists[name];
  }

  #createEmptyChecklist(): Checklist {
    return {
      entries: [],
    } satisfies Checklist;
  }
}
