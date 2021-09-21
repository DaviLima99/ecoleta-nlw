import {
  Body,
  Controller,
  Post,
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
import { editFileName } from '../../../../shared/filter/edit-filename.filter';
import { imageFileFilter } from '../../../../shared/filter/upload-image.filter';
import { PointService } from '../../application/services/point.service';
import { CreatePointDto } from '../dtos/form/create-point.dto';

@Controller('/api/v1/point')
@ApiTags('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The point has been created succesfully',
    type: CreatePointDto,
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
  async create(@Body() createPointDto: CreatePointDto) {
    const point = await this.pointService.create(createPointDto);
    // return new
    return point;
  }
}
