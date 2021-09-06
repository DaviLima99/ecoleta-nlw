import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { IItemRepository } from '../../../application/repositories/item.repository';
import { Item } from '../entities/item.entity';

@Injectable()
export class DataItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async save(item: Item): Promise<Item> {
    return await this.itemRepository.save(item);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Item>> {
    return paginate<Item>(this.itemRepository, options);
  }
}
