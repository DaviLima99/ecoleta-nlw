import { Point } from 'src/domain/point';
import { PointRepository } from 'src/domain/point.repository';
import { PostPointRequestDto } from 'src/infrastructure/rest/controllers/dto/post-point-request.dto';

export class CreatePoint {
  constructor(private readonly pointRepository: PointRepository) {}

  async execute(body: PostPointRequestDto): Promise<Point> {
    const point = new Point(
      body.name,
      body.image,
      body.email,
      body.phone,
      body.latitude,
      body.longitude,
      body.city,
      body.uf,
    );

    return this.pointRepository.create(point);
  }
}
