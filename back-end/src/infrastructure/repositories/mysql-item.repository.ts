import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/domain/item';
import { ItemRepository } from 'src/domain/item.repository';
import { Repository } from 'typeorm';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class MysqlItemRepository implements ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemEntityRepository: Repository<ItemEntity>,
  ) {}

  async findAll(): Promise<Item[]> {
    const foundItemsEntities: ItemEntity[] =
      await this.itemEntityRepository.find();

    return foundItemsEntities.map((itemEntity: ItemEntity) =>
      this.toItem(itemEntity),
    );
  }

  private toItem(itemEntity: ItemEntity): Item {
    const item: Item = new Item(
      itemEntity.id,
      itemEntity.title,
      itemEntity.imageUrl,
    );
    item.id = itemEntity.id;

    return item;
  }
}
