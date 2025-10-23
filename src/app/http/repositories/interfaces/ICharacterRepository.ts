import { CharacterCreate, CharacterResponse } from '../../dto/character';
import { UserResponse } from '../../dto/user';

export interface ICharacterRepository {
  create(data: CharacterCreate): Promise<CharacterResponse>;
  findById(id: number): Promise<CharacterResponse | null>;
  findAll(page: number): Promise<CharacterResponse[] | []>;
  update(id: number, data: CharacterCreate): Promise<CharacterResponse>;
  delete(id: number): Promise<void>;
  findUserByCharacterId(id: number): Promise<UserResponse[] | null>;
}
