import { cryptoData } from '../../../utils/Hash';
import { CreateUserDTO, FavoriteCharacterDto, UserResponse } from '../dto/user';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { CreateUserSchema } from '../schemas/user.schema';
import { randomUUID } from 'crypto';
import { ValidationService } from './ValidateService';
import { TokenService } from './TokenService';

export default class UserService {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: TokenService,
    private validationService: ValidationService,
  ) {}

  async create(userData: CreateUserDTO): Promise<UserResponse> {
    const validation = CreateUserSchema.safeParse(userData);

    if (!validation.success) {
      console.log(validation.error.message);
      throw new Error(
        `Validation Error: ${JSON.stringify(validation.error.format())}`,
      );
    }
    const data: CreateUserDTO = { ...validation.data };

    data.uuid = randomUUID();

    const hash = await cryptoData(data.password);

    data.password = hash.gen_hash;
    data.password_salt = hash.salt;

    data.uuid = crypto.randomUUID();
    const DTO: UserResponse = await this.userRepository.create(data);
    return DTO;
  }

  async findLogin(email: string | undefined): Promise<UserResponse | null> {
    if (!email) return null;
    const user: UserResponse | null = await this.userRepository.findLogin(
      email,
    );
    return user;
  }

  async findById(user_id: number | undefined): Promise<UserResponse | null> {
    if (!user_id) return null;
    const user: UserResponse | null = await this.userRepository.findById(
      user_id,
    );
    return user;
  }

  async update_favorite(
    favoriteData: FavoriteCharacterDto,
    user_id: number,
  ): Promise<UserResponse | null> {
    if (!favoriteData) return null;
    const user: UserResponse | null = await this.userRepository.update_favorite(
      favoriteData,
      user_id,
    );
    return user;
  }
}
