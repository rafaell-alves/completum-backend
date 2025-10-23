import { Params } from '../../dto/base';
import { MonsterCreate, MonsterResponse } from '../../dto/monster';

export interface IMonsterService {
  create(data: MonsterCreate): Promise<MonsterResponse>;
  findById(id: number): Promise<MonsterResponse | null>;
  findAll(params: Params): Promise<MonsterResponse[]>;
  update(id: number, data: MonsterCreate): Promise<MonsterResponse>;
  delete(id: number): Promise<void>;
}
