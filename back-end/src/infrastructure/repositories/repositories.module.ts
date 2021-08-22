import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';
import { ItemEntity } from './entities/item.entity';
import { MysqlItemRepository } from './mysql-item.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([ItemEntity]),
    EnvironmentConfigModule,
  ],
  providers: [MysqlItemRepository],
  exports: [MysqlItemRepository],
})
export class RepositoriesModule {}
