import { Point } from './point';

export interface PointRepository {
  create(point: Point): Promise<Point>;
  findAll(): Promise<Point[]>;
}
