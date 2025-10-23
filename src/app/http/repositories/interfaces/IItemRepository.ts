import { ItemCreate, ItemResponse } from '../../dto/item';

export interface IItemRepository {
  create(data: ItemCreate): Promise<ItemResponse>;
  findById(id: number): Promise<ItemResponse | null>;
  findAll(): Promise<ItemResponse[] | []>;
}
