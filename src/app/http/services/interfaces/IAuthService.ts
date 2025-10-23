import { UserResponse } from '../../dto/user';

export interface IAuthService {
  login(data: UserResponse): Promise<string | null>;
}
