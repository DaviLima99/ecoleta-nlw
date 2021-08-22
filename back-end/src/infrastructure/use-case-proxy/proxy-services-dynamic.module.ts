import { DynamicModule, Module } from '@nestjs/common';
import { GetItems } from 'src/use-cases/get-items';
import { MysqlItemRepository } from '../repositories/mysql-item.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static GET_ALL_ITEMS_PROXY_SERVICE = 'GetAllItemsProxyService';
  static CREATE_ITEM_PROXY_SERVICE = 'CreateItemProxyService';

  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [MysqlItemRepository],
          provide: ProxyServicesDynamicModule.GET_ALL_ITEMS_PROXY_SERVICE,
          useFactory: (mysqlItemRepository: MysqlItemRepository) =>
            new UseCaseProxy(new GetItems(mysqlItemRepository)),
        },
        // {
        //   inject: [MysqlItemRepository],
        //   provide: ProxyServicesDynamicModule.CREATE_ITEM_PROXY_SERVICE,
        //   useFactory: (mysqlItemRepository: MysqlItemRepository) =>
        //     new UseCaseProxy(new GetItems(mysqlItemRepository)),
        // },
      ],
      exports: [ProxyServicesDynamicModule.GET_ALL_ITEMS_PROXY_SERVICE],
    };
  }
}
