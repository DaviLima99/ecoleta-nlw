import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from '../item/infrastructure/typeorm/repositories/item.repository';
import { PointService } from './application/services/point.service';
import { PointRepository } from './infrastructure/typeorm/repositories/point.repository';
import { PointController } from './presentation/controllers/point.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointRepository, ItemRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
