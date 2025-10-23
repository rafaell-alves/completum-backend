import { CharacterCreate, CharacterResponse } from '../../dto/character';
import { UserResponse } from '../../dto/user';

export interface ICharacterService {
  create(data: CharacterCreate): Promise<CharacterResponse>;
  findById(id: number): Promise<CharacterResponse | null>;
  findAll(parsedQuery): Promise<CharacterResponse[] | []>;
  update(id: number, data: CharacterCreate): Promise<CharacterResponse>;
  delete(id: number): Promise<void>;
  getUsersByCharacterId(id: number): Promise<UserResponse[] | null>;
}
