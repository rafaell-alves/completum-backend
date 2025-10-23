import { CharacterCreate, CharacterResponse } from '../dto/character';
import { ICharacterRepository } from '../repositories/interfaces/ICharacterRepository';
import {
  CreateCharacterSchema,
  ParamsCharacterSchema,
} from '../schemas/character.schema';
import { ICharacterService } from './interfaces/ICharacterService';

import { ValidationService } from './ValidateService';
import { UserResponse } from '../dto/user';

export default class CharacterService implements ICharacterService {
  constructor(
    private characterRepository: ICharacterRepository,

    private validationService: ValidationService,
  ) {}
  async create(data: CharacterCreate): Promise<CharacterResponse> {
    data.uuid = crypto.randomUUID();
    return this.characterRepository.create(data);
  }
  async findById(id: number): Promise<CharacterResponse | null> {
    let data: CharacterResponse | null =
      await this.characterRepository.findById(id);
    return data;
  }
  async findAll(parsedQuery): Promise<CharacterResponse[] | []> {
    this.validationService.validate(parsedQuery, ParamsCharacterSchema);

    const page = parsedQuery.page ?? 0; // Padrão para 0 se não existir

    let data: CharacterResponse[] | [] = await this.characterRepository.findAll(
      page,
    );

    return data;
  }
  async update(id: number, data: CharacterCreate): Promise<CharacterResponse> {
    this.validationService.validate(data, CreateCharacterSchema);

    return this.characterRepository.update(id, data);
  }
  async delete(id: number): Promise<void> {
    return this.characterRepository.delete(id);
  }

  async getUsersByCharacterId(id: number): Promise<UserResponse[] | null> {
    return this.characterRepository.findUserByCharacterId(id);
  }
}
