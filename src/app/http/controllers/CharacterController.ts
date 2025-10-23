import { Request, Response } from 'express';
import { CharacterCreate, CharacterResponse } from '../dto/character';
import prisma from '../../../config/prisma.client';
import { ICharacterService } from '../services/interfaces/ICharacterService';
import CharacterService from '../services/CharacterService';

import CharacterRepository from '../repositories/CharacterRepository';
import { ValidationService } from '../services/ValidateService';

/**
 * PRECISO REFATORAR ISSO AINDA MEU DEUS
 * */
class CharacterController {
  private characterService: ICharacterService;

  constructor(characterService: ICharacterService) {
    this.characterService = characterService;
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      let data: CharacterCreate = { ...req.body };

      let DTO: CharacterResponse = await this.characterService.create(data);
      return res.status(201).json({ message: 'Personagem Criado', DTO });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const parsedQuery = {
        page: req.query.page ? Number(req.query.page) : undefined,
      };

      const data: CharacterResponse[] | [] =
        await this.characterService.findAll(parsedQuery);
      return res.status(201).json({ message: 'Listagem de personagem', data });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id);

    let data = await this.characterService.findById(id);
    return res.status(201).json({ message: 'Encontrado', data });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id);
    let data = await this.characterService.delete(id);
    return res.status(201).json({ message: 'Deletado', data });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id);
    console.log(req.body);
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'No data provided in the request body' });
    }
    let data = req.body;
    await prisma.character.update({
      where: { id: id },
      data: data,
    });
    let DTO: CharacterResponse = { ...data };
    return res.status(201).json({ message: 'Atualizado', DTO });
  }
}

const validationService = new ValidationService();
const characterRepository = new CharacterRepository();
const characterService = new CharacterService(
  characterRepository,

  validationService,
);

export default new CharacterController(characterService);
