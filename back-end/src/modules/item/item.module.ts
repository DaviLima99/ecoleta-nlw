import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './application/services/item.service';
import { Item } from './infrastructure/typeorm/entities/item.entity';
import { DataItemRepository } from './infrastructure/typeorm/repositories/data-item.repository';
import { ItemController } from './presentation/controllers/item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
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
