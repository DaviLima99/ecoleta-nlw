import { Item } from './item';

export interface ItemRepository {
  findAll(): Promise<Item[]>;
}
