import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../../presentation/dtos/create-item.dto';
import { IItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(
    @Inject('IItemRepository') private readonly itemRepository: IItemRepository,
  ) {}

  async create(createItemDto: CreateItemDto) {
    return await this.itemRepository.create(createItemDto);
  }
}
