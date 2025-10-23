import { Request, Response } from 'express';
import { BuildCreate, BuildResponse } from '../dto/build';
import IBuildService from '../services/interfaces/IBuildService';
import BuildService from '../services/BuildService';
import BuildRepository from '../repositories/BuildRepository';
import { Params } from '../dto/base';
import { ValidationService } from '../services/ValidateService';
import QueueService from '../services/QueueService';

import CharacterService from '../services/CharacterService';
import CharacterRepository from '../repositories/CharacterRepository';
import { ICharacterService } from '../services/interfaces/ICharacterService';
import { UserResponse } from '../dto/user';

class BuildController {
  constructor(
    private buildService: IBuildService,
    private queueService: QueueService,
    private characterService: ICharacterService,
  ) {
    this.buildService = buildService;
    this.queueService = queueService;
    this.characterService = characterService;
  }
  async index(req: Request, res: Response) {
    try {
      let params: Params = { ...req.query };

      const builds = await this.buildService.index(params);
      res.status(200).json(builds);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async find(req: Request, res: Response) {
    try {
      let id: number = parseInt(req.params.id);

      const builds = await this.buildService.find(id);
      res.status(200).json(builds);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const buildData: BuildCreate = req.body;

      const result: BuildResponse | null = await this.buildService.store(
        buildData,
      );

      if (result?.character_id) {
        const users: UserResponse[] | null =
          await this.characterService.getUsersByCharacterId(
            result.character_id,
          );
        console.log(users);

        if (users != null) {
          const messageData = {
            build_name: buildData.name,
            users: users,
          };
          await queueService.publish_message('default', messageData);
        }
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
const validationService = new ValidationService();
const buildRepository = new BuildRepository();
const queueService = new QueueService();

const characterRepository = new CharacterRepository();
const characterService = new CharacterService(
  characterRepository,

  validationService,
);
const buildService: IBuildService = new BuildService(
  buildRepository,
  validationService,
);

export default new BuildController(
  buildService,
  queueService,
  characterService,
);
