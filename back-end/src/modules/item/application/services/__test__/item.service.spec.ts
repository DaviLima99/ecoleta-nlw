import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../infrastructure/typeorm/entities/item.entity';
import { ItemRepository } from '../../../infrastructure/typeorm/repositories/item.repository';
import { CreateItemDto } from '../../../presentation/dtos/form/create-item.dto';
import { ItemService } from '../item.service';

describe('ItemService', () => {
  let service: ItemService;

  const mockItemReposiotry = {
    createItem: jest.fn().mockImplementation((item) =>
      Promise.resolve({
        id: Date.now(),
        title: item.title,
        imageUrl: 'test.svg',
      }),
    ),
    findAll: jest.fn(() => {
      return {
        id: Date.now(),
        title: 'test',
        imageUrl: 'test.svg',
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(ItemRepository),
          useValue: mockItemReposiotry,
        },
      ],
    }).compile();

    service = moduleRef.get<ItemService>(ItemService);
  });

  describe('ItemService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a item', async () => {
      const dto = {
        title: 'test',
        file: 'test',
        image: 'test.svg',
      } as CreateItemDto;

      const itemDto = Object.assign(new CreateItemDto(), dto);

      const result = await service.create(itemDto);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.title).toEqual(dto.title);
    });
  });
});
