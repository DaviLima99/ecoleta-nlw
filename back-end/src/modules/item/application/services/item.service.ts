import { Inject, Injectable } from '@nestjs/common';
import { Item } from '../../infrastructure/typeorm/entities/item.entity';
import { CreateItemDto } from '../../presentation/dtos/create-item.dto';
import { IItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('IItemRepository') private readonly itemRepository: IItemRepository,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item: Item = createItemDto.toItem();
    return await this.itemRepository.save(item);
  }
}
