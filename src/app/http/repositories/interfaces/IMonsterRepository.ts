import { MonsterCreate, MonsterResponse } from '../../dto/monster';
export interface IMonsterRepository {
  create(data: MonsterCreate): Promise<MonsterResponse>;
  findById(id: number): Promise<MonsterResponse | null>;
  findAll(page: number): Promise<MonsterResponse[] | []>;
  update(id: number, data: MonsterCreate): Promise<MonsterResponse>;
  delete(id: number): Promise<void>;
}
