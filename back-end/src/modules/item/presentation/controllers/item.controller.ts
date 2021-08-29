import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from '../../application/services/item.service';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Express } from 'express';

@Controller('/api/v1/item')
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
  @UseInterceptors(FileInterceptor('image'))
  // @Body(new ValidationPipe({ transform: true })) createItemDto: CreateItemDto
  @UsePipes(new ValidationPipe({ transform: true }))
  craete(@Body() createItemDto: CreateItemDto) {
    this.logger.debug(createItemDto);
    return this.itemService.create(createItemDto);
  }
}
