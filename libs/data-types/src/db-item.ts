import { ItemId } from './generated';
import { Bug } from './bug';
import { Fish } from './fish';
import { Item } from './item';

export type DbItem = {
  id: ItemId;
  item: Item;
  bug?: Bug;
  fish?: Fish;
};
