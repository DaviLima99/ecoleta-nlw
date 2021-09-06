import { Inject, Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '../../infrastructure/typeorm/entities/item.entity';
import { CreateItemDto } from '../../presentation/dtos/form/create-item.dto';
import { IItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('IItemRepository') private readonly itemRepository: IItemRepository,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item: Item = createItemDto.toItem();
    return await this.itemRepository.save(item);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Item>> {
    return await this.itemRepository.findAll(options);
  }
}
