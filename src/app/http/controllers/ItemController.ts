import { Response, Request } from 'express';
import { IItemService } from '../services/interfaces/IItemService';
import ItemRepository from '../repositories/ItemRepository';
import ItemService from '../services/ItemService';
import { ItemResponse } from '../dto/item';

import { ValidationService } from '../services/ValidateService';

class ItemController {
  private itemService: IItemService;
  constructor(itemService: IItemService) {
    this.itemService = itemService;
  }
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const items: ItemResponse[] = await this.itemService.getAllItems();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Error', error });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);

      const item: ItemResponse | null = await this.itemService.getItemById(id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ message: 'Error', error });
    }
  }
}
const validationService = new ValidationService();
const itemRepository = new ItemRepository();
const itemService = new ItemService(
  itemRepository,

  validationService,
);

export default new ItemController(itemService);
