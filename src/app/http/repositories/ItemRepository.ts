import { ItemCreate, ItemResponse } from '../dto/item';
import prisma from '../../../config/prisma.client';
import { IItemRepository } from './interfaces/IItemRepository';

export default class ItemRepository implements IItemRepository {
  async create(data: ItemCreate): Promise<ItemResponse> {
    const result: ItemResponse = await prisma.item.create({ data });
    return result;
  }

  async findById(id: number): Promise<ItemResponse | null> {
    const result: ItemResponse | null = await prisma.item.findUnique({
      where: { id },
    });
    return result;
  }
  async findAll(): Promise<ItemResponse[] | []> {
    const result: ItemResponse[] = await prisma.item.findMany();
    return result;
  }
}
