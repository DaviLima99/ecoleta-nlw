import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './application/services/item.service';
import { ItemEntity } from './infrastructure/typeorm/entities/item.entity';
import { DataItemRepository } from './infrastructure/typeorm/repositories/mysql-item.repository';
import { ItemController } from './presentation/controllers/item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemController],
  providers: [
    ItemService,
    {
      provide: 'IItemRepository',
      useClass: DataItemRepository,
    },
  ],
})
export class ItemModule {}
