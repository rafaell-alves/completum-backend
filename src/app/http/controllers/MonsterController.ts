import { Request, Response } from 'express';
import prisma from '../../../config/prisma.client';
import { MonsterCreate, MonsterResponse, MonsterUpdate } from '../dto/monster';
import MonsterRepository from '../repositories/MonsterRepository';
import MonsterService from '../services/MonsterService';
import { Params } from '../dto/base';
import { ValidationService } from '../services/ValidateService';

class MonsterController {
  constructor(private monsterService: MonsterService) {}

  async store(
    req: Request<{}, {}, MonsterCreate>,
    res: Response,
  ): Promise<Response> {
    try {
      const parsedBody: MonsterCreate = {
        ...req.body,
        weakness: this.safeJsonParse(req.body.weakness),
        ailments: this.safeJsonParse(req.body.ailments),
        resistances: this.safeJsonParse(req.body.resistances),
        elements: this.safeJsonParse(req.body.elements),
        gallery: this.safeJsonParse(req.body.gallery),
      };

      var DTO: MonsterResponse = await this.monsterService.create(parsedBody); // Chama o método de criação do BO
      return res.status(201).json({ message: 'Personagem Criado', DTO });
    } catch (error) {
      console.error('Error creating monster:', error);
      return res.status(500).json({ message: 'Erro ao criar monstro', error });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    // Converte 'page' para número antes da validação
    try {
      const params: Params = { ...req.params };

      let data: MonsterResponse[] = await this.monsterService.findAll(params);

      return res.status(201).json({ message: 'Listagem de personagem', data });
    } catch (error) {
      console.error('Error fetching monsters:', error);
      return res
        .status(500)
        .json({ message: 'Erro ao buscar monstros', error });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);

      let dto: MonsterResponse | null = await this.monsterService.findById(id);

      if (!dto) {
        return res.status(404).json({ message: 'Monstro não encontrado' });
      }

      return res.status(201).json({ message: 'Encontrado', dto });
    } catch (error) {
      console.error('Error fetching monster:', error);
      return res.status(500).json({ message: 'Erro ao buscar monstro', error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);
      let data = await prisma.monsters.delete({ where: { id } });
      return res.status(201).json({ message: 'Deletado', data });
    } catch (error) {
      console.error('Error deleting monster:', error);
      return res
        .status(500)
        .json({ message: 'Erro ao deletar monstro', error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);
      const parsedBody: MonsterUpdate = {
        ...req.body,
        weakness: this.safeJsonParse(req.body.weakness),
        ailments: this.safeJsonParse(req.body.ailments),
        resistances: this.safeJsonParse(req.body.resistances),
        elements: this.safeJsonParse(req.body.elements),
        gallery: this.safeJsonParse(req.body.gallery),
      };

      this.monsterService.update(id, parsedBody);
      return res.status(201).json({ message: 'Atualizado', parsedBody });
    } catch (error) {
      console.log(error);
      return res.status(201).json({ message: 'Error', error });
      // return res.status(201).json({ message: 'Atualizado', parsedBody });
    }
  }
  safeJsonParse(value: unknown) {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return null;
    }
  }
}
const validationService = new ValidationService();
const monsterRepository = new MonsterRepository();
const monsterService = new MonsterService(
  monsterRepository,

  validationService,
);

export default new MonsterController(monsterService);
