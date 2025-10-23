import { MonsterCreate, MonsterResponse } from '../dto/monster';
import prisma from '../../../config/prisma.client';
import { IMonsterRepository } from './interfaces/IMonsterRepository';
export default class MonsterRespository implements IMonsterRepository {
  async create(data: MonsterCreate): Promise<MonsterResponse> {
    data.uuid = crypto.randomUUID();

    console.log(data);
    const DTO: MonsterResponse = await prisma.monsters.create({ data });
    return DTO;
  }
  async findById(id: number): Promise<MonsterResponse | null> {
    const monster: MonsterResponse | null = await prisma.monsters.findUnique({
      where: { id: id },
    });
    return monster;
  }
  async findAll(page: number): Promise<MonsterResponse[]> {
    const monsters: MonsterResponse[] = await prisma.monsters.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
    console.log(monsters);
    return monsters;
  }
  async update(id: number, data: MonsterCreate): Promise<MonsterResponse> {
    const updatedMonster: MonsterResponse = await prisma.monsters.update({
      where: { id: id },
      data,
    });
    return updatedMonster;
  }
  async delete(id: number): Promise<void> {
    await prisma.monsters.delete({
      where: { id: id },
    });
  }
}
