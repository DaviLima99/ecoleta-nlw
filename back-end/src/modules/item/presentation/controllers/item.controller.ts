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
import { diskStorage } from 'multer';
import { editFileName } from '../../../../shared/filter/edit-filename.filter';
import { imageFileFilter } from '../../../../shared/filter/upload-image.filter';
import { ItemService } from '../../application/services/item.service';
import { CreateItemDto } from '../dtos/create-item.dto';
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
  craete(@UploadedFile() file, @Body() createItemDto: CreateItemDto) {
    createItemDto.image = file.filename;
    return this.itemService.create(createItemDto);
  }
}
