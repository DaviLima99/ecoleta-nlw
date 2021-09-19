import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Point } from '../../infrastructure/typeorm/entities/point.entity';

export interface IPointRepository {
  createPoint(point: Point): Promise<Point>;
  findAll(options: IPaginationOptions): Promise<Pagination<Point>>;
}
