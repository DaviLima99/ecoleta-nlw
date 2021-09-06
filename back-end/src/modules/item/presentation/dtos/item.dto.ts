import { ApiPropertyOptional } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '../../infrastructure/typeorm/entities/item.entity';

export class ItemDto {
  @ApiPropertyOptional({})
  id: number;

  @ApiPropertyOptional({})
  title: string;

  @ApiPropertyOptional({})
  imageUrl: string;

  constructor(item: Item) {
    this.id = item.id;
    this.title = item.title;
    this.imageUrl = item.imageUrl;
  }

  public static convert(items: Pagination<Item>): Pagination<ItemDto> {
    items.items.map((item) => new ItemDto(item));
    return items;
  }
}
