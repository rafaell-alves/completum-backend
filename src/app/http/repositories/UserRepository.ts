import { User } from '@prisma/client';
import prisma from '../../../config/prisma.client';
import { CreateUserDTO, FavoriteCharacterDto, UserResponse } from '../dto/user';
import { IUserRepository } from './interfaces/IUserRepository';

export default class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return await prisma.user.create({ data });
  }
  async findLogin(email: string | undefined): Promise<UserResponse | null> {
    const user: UserResponse | null = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        password_salt: true,
      },
      where: { email: email },
    });

    return user;
  }

  async findById(user_id: number | undefined): Promise<UserResponse | null> {
    const user: UserResponse | null = await prisma.user.findUnique({
      include: {
        FavoriteCharacter: {
          include: {
            character: true,
          },
        },
      },
      where: { id: user_id },
    });

    return user;
  }

  async update_favorite(
    data: FavoriteCharacterDto,
    user_id: number,
  ): Promise<User> {
    await prisma.favoriteCharacter.deleteMany({
      where: { user_id },
    });

    // Cria os novos favoritos
    await prisma.favoriteCharacter.createMany({
      data: data.favorite_id.map(character_id => ({
        user_id,
        character_id,
      })),
    });

    // Retorna o usuário com os favoritos atualizados
    return await prisma.user.findUniqueOrThrow({
      where: { id: user_id },
      include: {
        FavoriteCharacter: {
          include: {
            character: true,
          },
        },
      },
    });
  }
}
