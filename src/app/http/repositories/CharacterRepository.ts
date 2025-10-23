import { Prisma } from '@prisma/client';
import prisma from '../../../config/prisma.client';
import { CharacterCreate, CharacterResponse } from '../dto/character';
import { ICharacterRepository } from './interfaces/ICharacterRepository';
import { UserResponse } from '../dto/user';

export default class CharacterRepository implements ICharacterRepository {
  async create(data: CharacterCreate): Promise<CharacterResponse> {
    const prismaData = {
      ...data,

      gallery: data.gallery === null ? Prisma.JsonNull : data.gallery,
    };

    const result = await prisma.character.create({
      data: prismaData,
    });

    return {
      ...result,
      gallery: result.gallery ? JSON.stringify(result.gallery) : null,
    };
  }

  async findById(id: number): Promise<CharacterResponse | null> {
    const result = await prisma.character.findUnique({
      where: { id: id },
    });

    if (!result) return null;

    return {
      ...result,
      gallery: result.gallery ? JSON.stringify(result.gallery) : null,
    };
  }

  async findAll(page: number): Promise<CharacterResponse[]> {
    const characters = await prisma.character.findMany({
      orderBy: { name: 'asc' },
      skip: page * 10,
      take: 10,
    });
    console.log(characters);

    return characters.map(character => ({
      ...character,
      gallery: character.gallery ? JSON.stringify(character.gallery) : null,
    }));
  }

  async update(id: number, data: CharacterCreate): Promise<CharacterResponse> {
    const prismaData = {
      ...data,
      gallery: data.gallery === null ? Prisma.JsonNull : data.gallery,
    };

    const result = await prisma.character.update({
      where: { id: id },
      data: prismaData,
    });

    return {
      ...result,
      gallery: result.gallery ? JSON.stringify(result.gallery) : null,
    };
  }
  async delete(id: number): Promise<void> {
    await prisma.character.delete({
      where: { id: id },
    });
  }

  async findUserByCharacterId(id: number): Promise<UserResponse[] | null> {
    const favoriteCharacters = await prisma.favoriteCharacter.findMany({
      where: {
        character_id: id,
      },
      include: {
        user: true,
      },
    });

    const result: UserResponse[] | null = favoriteCharacters.map(fc => fc.user);
    return result;
  }
}
