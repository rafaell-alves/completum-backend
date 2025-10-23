import { BuildResponse, BuildUpdate, BuildCreate } from '../dto/build';
import { IBuildRepository } from '../repositories/interfaces/IBuildRepository';
import IBuildService from './interfaces/IBuildService';

import { ValidationService } from './ValidateService';

export default class BuildService implements IBuildService {
  constructor(
    private buildRepository: IBuildRepository,

    private validationService: ValidationService,
  ) {}

  async index(): Promise<BuildResponse[] | []> {
    return await this.buildRepository.findBuilds();
  }
  async find(id: number): Promise<BuildResponse | null> {
    return await this.buildRepository.findBuild(id);
  }
  async store(buildData: BuildCreate): Promise<BuildResponse | null> {
    return await this.buildRepository.create(buildData);
  }
  async updateBuild(
    id: string,
    buildData: BuildUpdate,
  ): Promise<BuildResponse | null> {
    return await this.buildRepository.update(id, buildData);
  }
}
