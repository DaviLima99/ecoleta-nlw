import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from '../../application/services/item.service';
import { CreateItemDto } from '../dtos/create-item.dto';

@Controller('/api/item')
@ApiTags('item')
export class ItemController {
  private logger = new Logger('ItemController');

  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The item has been created succesfully',
    type: CreateItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Missing or too many params',
  })
  craete(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }
}
