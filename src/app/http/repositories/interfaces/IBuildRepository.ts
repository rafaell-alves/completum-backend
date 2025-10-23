import { BuildCreate, BuildResponse, BuildUpdate } from '../../dto/build';

export interface IBuildRepository {
  findBuilds(): Promise<BuildResponse[] | []>;
  findBuild(id: number): Promise<BuildResponse | null>;
  create(buildData: BuildCreate): Promise<BuildResponse | null>;
  update(id: string, buildData: BuildUpdate): Promise<BuildResponse | null>;
  //   deleteBuild(id: string): Promise<any>;
}
