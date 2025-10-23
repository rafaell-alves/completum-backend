import {
  CreateUserDTO,
  FavoriteCharacterDto,
  UserResponse,
} from '../../dto/user';

export interface IUserService {
  create(data: CreateUserDTO): Promise<UserResponse>;
  findLogin(email: string | undefined): Promise<UserResponse | null>;
  findById(user_id: number | undefined): Promise<UserResponse | null>;
  update_favorite(
    data: FavoriteCharacterDto,
    user_id: number,
  ): Promise<UserResponse | null>;
}
