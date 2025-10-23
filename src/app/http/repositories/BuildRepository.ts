import prisma from '../../../config/prisma.client';
import { BuildCreate, BuildResponse, BuildUpdate } from '../dto/build';
import { IBuildRepository } from './interfaces/IBuildRepository';

export default class BuildRepository implements IBuildRepository {
  async findBuilds(): Promise<BuildResponse[]> {
    let result: BuildResponse[] | [] = await {
      ...prisma.build.findMany({
        include: {
          items: true,
          character: true,
          user: {
            select: {
              nickname: true,
              id: true,
              name: true,
            },
          },
        },
      }),
    };
    return result;
  }

  async findBuild(id: number): Promise<BuildResponse | null> {
    let result: BuildResponse | null = await {
      ...prisma.build.findUnique({
        where: { id: id },
        include: {
          items: true,
          character: true,
          user: {
            select: {
              nickname: true,
              id: true,
              name: true,
            },
          },
        },
      }),
    };
    return result;
  }
  async create(data: BuildCreate): Promise<BuildResponse | null> {
    // Remover character_uuid e items para não ter conflito com as relações
    // const { character_uuid, items: itemIds, ...restData } = data;

    const { character_id, user_id, items: itemsId, ...restData } = data;

    const result = await prisma.build.create({
      data: {
        ...restData,
        character: {
          connect: { id: character_id },
        },
        user: {
          connect: { id: user_id },
        },
        items: itemsId?.length
          ? {
              connect: itemsId.map(itemId => ({ id: Number(itemId) })),
            }
          : undefined,
      },
    });
    return result;
  }

  async update(id: string, data: BuildUpdate): Promise<BuildResponse | null> {
    await prisma.build.update({
      where: { id: Number(id) },
      data,
    });
    return null;
  }
}
