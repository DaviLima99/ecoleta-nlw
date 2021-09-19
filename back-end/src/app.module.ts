import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './modules/item/item.module';
import dbConfig from './shared/config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      load: [dbConfig],
    }),
    TypeOrmModule.forRoot(dbConfig()),
    ItemModule,
  ],
})
export class AppModule {}
