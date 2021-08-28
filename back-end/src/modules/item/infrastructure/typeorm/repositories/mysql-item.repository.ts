import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/domain/item';
import { Repository } from 'typeorm';
import { IItemRepository } from '../../../application/repositories/item.repository';
import { ItemEntity } from '../entities/item.entity';

@Injectable()
export class DataItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemEntityRepository: Repository<ItemEntity>,
  ) {}

  async create(item: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async save(item: Item): Promise<Item> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Item[]> {
    const foundItemsEntities: ItemEntity[] =
      await this.itemEntityRepository.find();

    return foundItemsEntities.map((itemEntity: ItemEntity) =>
      this.toItem(itemEntity),
    );
  }

  private toItem(itemEntity: ItemEntity): Item {
    const item: Item = new Item(itemEntity.title, itemEntity.imageUrl);
    item.id = itemEntity.id;

    return item;
  }
}
