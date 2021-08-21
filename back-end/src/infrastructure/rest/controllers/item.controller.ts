import { Controller, Get, Inject } from '@nestjs/common';
import { Item } from 'src/domain/item';
import { ProxyServicesDynamicModule } from 'src/infrastructure/use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from 'src/infrastructure/use-case-proxy/use-case-proxy';
import { GetItems } from 'src/use-cases/get-items';

@Controller('/api/item')
export class ItemController {
  constructor(
    @Inject(ProxyServicesDynamicModule.GET_ALL_ITEMS_PROXY_SERVICE)
    private readonly getAllItemsProxyService: UseCaseProxy<GetItems>,
  ) {}

  @Get('/')
  async getAllItems(): Promise<Item[]> {
    return this.getAllItemsProxyService.getInstance().execute();
  }
}
