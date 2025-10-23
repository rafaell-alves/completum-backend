import { ItemResponse } from '../dto/item';
import { IItemRepository } from '../repositories/interfaces/IItemRepository';
import { IItemService } from './interfaces/IItemService';

import { ValidationService } from './ValidateService';
export default class ItemService implements IItemService {
  // Simulate a database or external service

  constructor(
    private itemRepository: IItemRepository,

    private validationService: ValidationService,
  ) {}

  async getItemById(id: number): Promise<ItemResponse | null> {
    const item: ItemResponse | null = await this.itemRepository.findById(id);
    return item;
  }

  async getAllItems(): Promise<ItemResponse[] | []> {
    const items: ItemResponse[] = await this.itemRepository.findAll();
    return items;
  }
}
