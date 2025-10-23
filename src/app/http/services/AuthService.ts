import { UserResponse } from '../dto/user';

import { IAuthService } from './interfaces/IAuthService';
import { IUserService } from './interfaces/IUserService';

import { validString } from '../../../utils/Hash';
import { APIError } from '../../../utils/Error';

import { ValidationService } from './ValidateService';
import { TokenService } from './TokenService';
import { HttpStatusCode } from '../../../utils/HttpStatusCode';
import { LoginSchema } from '../schemas/user.schema';
export default class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private tokenService: TokenService,
    private validationService: ValidationService,
  ) {}
  async login(data: UserResponse): Promise<string> {
    this.validationService.validate(data, LoginSchema);

    const user = await this.findAndValidateUser(data);

    return this.tokenService.generateToken(user);
  }

  private async findAndValidateUser(data: UserResponse): Promise<UserResponse> {
    const user = await this.userService.findLogin(data.email);

    if (!user) {
      throw new APIError(
        'Usuário não encontrado',
        HttpStatusCode.BAD_REQUEST,
        true,
        `Nenhum usuário encontrado com esse email`,
      );
    }

    const isValidPassword = await validString(
      data.password,
      user.password,
      user.password_salt,
    );

    if (!isValidPassword) {
      throw new APIError(
        'Senha incompatível',
        HttpStatusCode.BAD_REQUEST,
        true,
        `Não foi possível realizar login: senha incorreta`,
      );
    }

    return user;
  }
}
