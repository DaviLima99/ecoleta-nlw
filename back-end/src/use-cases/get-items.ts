import { Item } from 'src/domain/item';
import { ItemRepository } from 'src/domain/item.repository';
import { GetItemResponseDto } from 'src/infrastructure/rest/controllers/dto/get-item-response.dto';

export class GetItems {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<GetItemResponseDto[]> {
    const items = await this.itemRepository.findAll();
    const serializedItems = items.map((item: Item) => {
      const url = `http://192.168.1.5:3000/uploads/${item.imageUrl}`;
      return new GetItemResponseDto(item.id, item.title, url);
    });

    return serializedItems;
  }
}
