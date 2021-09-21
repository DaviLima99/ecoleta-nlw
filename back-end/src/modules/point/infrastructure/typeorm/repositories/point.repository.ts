import {
  IPaginationOptions,
  IPaginationMeta,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { IPointRepository } from '../../../application/repositories/point.repository';
import { Point } from '../entities/point.entity';

@EntityRepository(Point)
export class PointRepository
  extends Repository<Point>
  implements IPointRepository
{
  public async createPoint(point: Point): Promise<Point> {
    return await this.save(point);
  }

  findAll(
    options: IPaginationOptions<IPaginationMeta>,
  ): Promise<Pagination<Point, IPaginationMeta>> {
    throw new Error('Method not implemented.');
  }
}
