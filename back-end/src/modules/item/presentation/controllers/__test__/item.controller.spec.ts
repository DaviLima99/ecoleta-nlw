import { Test } from '@nestjs/testing';
import { ItemService } from '../../../application/services/item.service';
import { CreateItemDto } from '../../dtos/form/create-item.dto';
import { ItemController } from '../item.controller';

describe('ItemController', () => {
  let itemController: ItemController;

  const mockItemService = {
    create: jest.fn().mockImplementation((dto) => {
      return {
        id: Date.now(),
        title: dto.title,
        imageUrl: dto.image,
      };
    }),
    findAll: jest.fn(() => {
      return {
        id: Date.now(),
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
    })
      .overrideProvider(ItemService)
      .useValue(mockItemService)
      .compile();

    itemController = moduleRef.get<ItemController>(ItemController);
  });

  describe('ItemController', () => {
    it('should be defined', () => {
      expect(itemController).toBeDefined();
    });

    it('should create a item', async () => {
      const dto = {
        title: 'papper',
      } as CreateItemDto;

      const file = {
        fieldname: 'file',
        originalname: 'papper.svg',
        encoding: '7bit',
        mimetype: 'image/svg+xml',
        destination: './upload',
        filename: 'papper-3f29.svg',
        path: 'upload\\papper-3f29.svg',
        size: 568,
      };

      const result = await itemController.create(file, dto);
      expect(result.id).toBeDefined();

      expect(mockItemService.create).toBeCalled();
    });

    // it('should return a pagination of item', async () => {
    //   const dto = {
    //     title: '',
    //     file: '',
    //     image: '',
    //   } as CreateItemDto;

    //   const file = {};
    //   const result = await itemController.create(file, dto);
    //   expect(result).toEqual({
    //     id: expect.any(Number),
    //   });
    // });
  });
});
