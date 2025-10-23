import { Params } from '../dto/base';
import { MonsterCreate, MonsterResponse, MonsterUpdate } from '../dto/monster';
import { IMonsterRepository } from '../repositories/interfaces/IMonsterRepository';
import { CreateMonsterSchema } from '../schemas/monster.schemas';
import { IMonsterService } from './interfaces/IMonsterService';

import { ValidationService } from './ValidateService';

export default class MonsterService implements IMonsterService {
  constructor(
    private monsterRepository: IMonsterRepository,

    private validationService: ValidationService,
  ) {}

  async create(data: MonsterCreate): Promise<MonsterResponse> {
    const validation = CreateMonsterSchema.safeParse(data);

    if (!validation.success) {
      throw new Error('Invalid data: ' + validation.error.message);
    }

    return this.monsterRepository.create(data);
  }

  async findById(id: number): Promise<MonsterResponse | null> {
    return this.monsterRepository.findById(id);
  }

  async findAll(params: Params): Promise<MonsterResponse[] | []> {
    let page = params.page ? parseInt(params.page.toString()) : 1;

    return this.monsterRepository.findAll(page);
  }

  async update(id: number, data: MonsterUpdate): Promise<MonsterResponse> {
    const validation = CreateMonsterSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `Validation Error: ${JSON.stringify(validation.error.format())}`,
      );
    }
    return this.monsterRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.monsterRepository.delete(id);
  }
}
