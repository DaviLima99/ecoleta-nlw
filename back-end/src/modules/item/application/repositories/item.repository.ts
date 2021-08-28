import { ItemEntity } from '../../infrastructure/typeorm/entities/item.entity';
import { CreateItemDto } from '../../presentation/dtos/create-item.dto';

export interface IItemRepository {
  create(item: CreateItemDto): Promise<ItemEntity>;
}
