import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Item } from '../../../infrastructure/typeorm/entities/item.entity';

export class CreateItemDto {
  @ApiProperty({
    description: 'Item title',
    example: 'pappers',
  })
  @IsNotEmpty({ message: 'title field is required' })
  title: string;

  @ApiProperty({
    description: 'Item image file SVG',
    type: 'string',
    format: 'binary',
  })
  file: string;

  image: string;

  public toItem(): Item {
    const item: Item = new Item(this.title, this.image);
    return item;
  }
}
