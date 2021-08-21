import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MysqlItemRepository } from "./mysql-item.repository";

@Module({
  imports: [TypeOrmConfigModule],
  providers: [MysqlItemRepository],
  exports: [MysqlItemRepository]
})

export class RepositoriesModule;