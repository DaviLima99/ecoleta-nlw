import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './application/services/item.service';
import { ItemRepository } from './infrastructure/typeorm/repositories/item.repository';
import { ItemController } from './presentation/controllers/item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
