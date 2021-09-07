import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '../../infrastructure/typeorm/entities/item.entity';
import { ItemRepository } from '../../infrastructure/typeorm/repositories/item.repository';
import { CreateItemDto } from '../../presentation/dtos/form/create-item.dto';
import { IItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private readonly itemRepository: IItemRepository,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item: Item = createItemDto.toItem();
    return await this.itemRepository.createItem(item);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Item>> {
    return await this.itemRepository.findAll(options);
  }
}
