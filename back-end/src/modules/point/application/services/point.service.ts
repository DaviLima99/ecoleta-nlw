import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IItemRepository } from '../../../item/application/repositories/item.repository';
import { ItemRepository } from '../../../item/infrastructure/typeorm/repositories/item.repository';
import { Point } from '../../infrastructure/typeorm/entities/point.entity';
import { PointRepository } from '../../infrastructure/typeorm/repositories/point.repository';
import { CreatePointDto } from '../../presentation/dtos/form/create-point.dto';
import { IPointRepository } from '../repositories/point.repository';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(PointRepository)
    private readonly pointRepository: IPointRepository,
    @InjectRepository(ItemRepository)
    private readonly itemRepository: IItemRepository,
  ) {}

  async create(createPointDto: CreatePointDto): Promise<Point> {
    const ids = createPointDto.listItem
      .split(',')
      .map((item: string) => Number(item.trim()));

    const items = await this.itemRepository.findByIds(ids);

    const point: Point = createPointDto.toPoint(items);
    return await this.pointRepository.createPoint(point);
  }
}
