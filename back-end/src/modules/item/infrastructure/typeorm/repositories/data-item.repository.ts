import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll(): Promise<Item[]> {
    const foundItemsEntities: Item[] = await this.itemRepository.find();

    return foundItemsEntities;
  }

  // private toItem(Item: Item): Item {
  //   const item: Item = new Item(Item.title, Item.imageUrl);
  //   item.id = Item.id;

  //   return item;
  // }
}
