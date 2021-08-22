import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use-case-proxy/proxy-services-dynamic.module';
import { ItemController } from './controllers/item.controller';
import { InvalidItemErrorFilter } from './filters/invalid-items-error.filter';

@Module({
  imports: [ProxyServicesDynamicModule.register()],
  controllers: [ItemController],
  providers: [{ provide: APP_FILTER, useClass: InvalidItemErrorFilter }],
})
export class RestModule {}
