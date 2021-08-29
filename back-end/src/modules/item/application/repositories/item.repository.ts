import { Item } from '../../infrastructure/typeorm/entities/item.entity';
import { CreateItemDto } from '../../presentation/dtos/create-item.dto';

export interface IItemRepository {
  save(item: Item): Promise<Item>;
}
