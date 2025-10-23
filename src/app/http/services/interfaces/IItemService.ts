import { ItemResponse } from '../../dto/item';

export interface IItemService {
  getItemById(id: number): Promise<ItemResponse | null>;
  getAllItems(): Promise<ItemResponse[] | []>;
}
