import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '../../infrastructure/typeorm/entities/item.entity';

export interface IItemRepository {
  save(item: Item): Promise<Item>;
  findAll(options: IPaginationOptions): Promise<Pagination<Item>>;
}
