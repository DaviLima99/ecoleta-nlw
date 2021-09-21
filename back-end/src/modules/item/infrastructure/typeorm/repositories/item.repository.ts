import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { IItemRepository } from '../../../application/repositories/item.repository';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository
  extends Repository<Item>
  implements IItemRepository
{
  public async createItem(item: Item): Promise<Item> {
    return await this.save(item);
  }

  public async findAll(options: IPaginationOptions): Promise<Pagination<Item>> {
    return paginate<Item>(this, options);
  }

  public async findByIds(ids: Array<number>): Promise<Array<Item>> {
    return await this.find({
      where: { id: ids },
    });
  }
}
