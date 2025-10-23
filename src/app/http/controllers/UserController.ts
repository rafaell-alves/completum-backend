import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { CreateUserDTO, FavoriteCharacterDto, UserResponse } from '../dto/user';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IUserService } from '../services/interfaces/IUserService';
import UserService from '../services/UserService';
import { TokenService } from '../services/TokenService';
import { ValidationService } from '../services/ValidateService';

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const userData: CreateUserDTO = req.body;
      var response: UserResponse = await this.userService.create(userData);

      return res.status(201).json({
        message: 'User created successfully',
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      var user_id: number | null = parseInt(req.params.id);
      var response: UserResponse | null = await this.userService.findById(
        user_id,
      );

      return res.status(201).json({
        message: 'User created successfully',
        data: response,
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async add_character_favorites(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const favoriteData: FavoriteCharacterDto = req.body;
    var user_id: number | null = 1;
    if (req.params.id != undefined) {
      user_id = parseInt(req.params.id);
    }
    if (req.params.user_id != undefined) {
      user_id = parseInt(req.params.user_id);
    }
    console.log(user_id);
    console.log(favoriteData);
    var response: UserResponse | null = await this.userService.update_favorite(
      favoriteData,
      user_id,
    );
    return res.status(201).json({ message: 'Atualizado', response });
  }
}
const tokenService = new TokenService();
const validationService = new ValidationService();
const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(
  userRepository,
  tokenService,
  validationService,
);

export default new UserController(userService);
