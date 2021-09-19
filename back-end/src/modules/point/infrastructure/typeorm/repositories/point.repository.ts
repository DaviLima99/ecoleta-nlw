import {
  IPaginationOptions,
  IPaginationMeta,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { IPointRepository } from '../../../application/repositories/point.repository';
import { Point } from '../entities/point.entity';

export class PointRepository
  extends Repository<Point>
  implements IPointRepository
{
  createPoint(point: Point): Promise<Point> {
    throw new Error('Method not implemented.');
  }

  findAll(
    options: IPaginationOptions<IPaginationMeta>,
  ): Promise<Pagination<Point, IPaginationMeta>> {
    throw new Error('Method not implemented.');
  }
}
