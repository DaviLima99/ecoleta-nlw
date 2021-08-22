import { Controller, Get, Inject } from '@nestjs/common';
import { ProxyServicesDynamicModule } from 'src/infrastructure/use-case-proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from 'src/infrastructure/use-case-proxy/use-case-proxy';
import { GetItems } from 'src/use-cases/get-items';
import { GetItemResponseDto } from './dto/get-item-response.dto';

@Controller('/api/item')
export class ItemController {
  constructor(
    @Inject(ProxyServicesDynamicModule.GET_ALL_ITEMS_PROXY_SERVICE)
    private readonly getAllItemsProxyService: UseCaseProxy<GetItems>,
  ) {}

  @Get('/')
  async getAllItems(): Promise<GetItemResponseDto[]> {
    return this.getAllItemsProxyService.getInstance().execute();
  }
}
