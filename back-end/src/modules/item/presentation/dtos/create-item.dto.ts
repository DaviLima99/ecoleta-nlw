import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  name: string;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  image: string;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  email: string;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  phone: string;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  latitude: number;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  longitude: number;
  @ApiProperty({
    description: 'Item name',
    example: '',
  })
  @IsNotEmpty({ message: 'name field is required' })
  city: string;
  uf: string;
}
