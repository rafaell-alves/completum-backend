import { UserResponse } from '../dto/user';
import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { IAuthService } from '../services/interfaces/IAuthService';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import { TokenService } from '../services/TokenService';
import { ValidationService } from '../services/ValidateService';

class AuthController {
  constructor(private authService: IAuthService) {}

  async login(req: Request, res: Response) {
    try {
      const data: UserResponse = { ...req.body };
      const token: string | null = await this.authService.login(data);
      return res.status(201).json({ message: 'Login Efetuado', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
const userRepository = new UserRepository();
const tokenService = new TokenService();
const validationService = new ValidationService();

const userService = new UserService(
  userRepository,
  tokenService,
  validationService,
);
const authService = new AuthService(
  userService,
  tokenService,
  validationService,
);

export default new AuthController(authService);
