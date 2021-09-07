import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { editFileName } from '../../../../shared/filter/edit-filename.filter';
import { imageFileFilter } from '../../../../shared/filter/upload-image.filter';
import { ItemService } from '../../application/services/item.service';
import { CreateItemDto } from '../dtos/form/create-item.dto';
import { ItemDto } from '../dtos/item.dto';
@Controller('/api/v1/item')
@ApiTags('item')
export class ItemController {
  private logger = new Logger('ItemController');

  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The item has been created succesfully',
    type: CreateItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Missing or too many params',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @UploadedFile() file,
    @Body() createItemDto: CreateItemDto,
  ): Promise<ItemDto> {
    createItemDto.image = file.filename;
    const item = await this.itemService.create(createItemDto);
    return new ItemDto(item);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ItemDto>> {
    const items = await this.itemService.findAll({
      page,
      limit,
      route: '/api/v1/item',
    });
    return ItemDto.convert(items);
  }
}
