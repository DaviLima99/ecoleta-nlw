import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Item } from '../../../../item/infrastructure/typeorm/entities/item.entity';
import { Point } from '../../../infrastructure/typeorm/entities/point.entity';

export class CreatePointDto {
  @ApiProperty({
    description: 'Point image',
  })
  @IsNotEmpty({ message: 'image field is required' })
  image: string;

  @ApiProperty({
    description: 'Point name',
  })
  @IsNotEmpty({ message: 'name field is required' })
  name: string;

  @ApiProperty({
    description: 'Point email contact',
    example: 'name@example.com',
  })
  @IsNotEmpty({ message: 'email field is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Point phone contact',
    example: 'XX 1234-1233',
  })
  @IsNotEmpty({ message: 'phone field is required' })
  phone: string;

  @ApiProperty({
    description: 'Latitude location ',
    example: '-21.3213',
  })
  @IsNotEmpty({ message: 'latitude field is required' })
  latitude: number;

  @ApiProperty({
    description: 'Longitude location ',
    example: '-21.3213',
  })
  @IsNotEmpty({ message: 'longitude field is required' })
  longitude: number;

  @ApiProperty({
    description: 'Point city locaiton',
    example: 'São Paulo',
  })
  @IsNotEmpty({ message: 'city field is required' })
  city: string;

  @ApiProperty({
    description: 'UF location',
    example: 'SP',
  })
  @IsNotEmpty({ message: 'uf field is required' })
  uf: string;

  @ApiProperty({
    description: 'Item id list',
    example: '1, 2, 3',
  })
  @IsNotEmpty({ message: 'listItem field is required' })
  listItem: string;

  items: Item[];

  public toPoint(items: Item[]): Point {
    this.items = items;

    const point: Point = new Point(
      this.image,
      this.name,
      this.email,
      this.phone,
      this.latitude,
      this.longitude,
      this.city,
      this.uf,
      this.items,
    );

    return point;
  }
}
