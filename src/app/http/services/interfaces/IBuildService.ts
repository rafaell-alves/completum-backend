import { BuildCreate, BuildResponse, BuildUpdate } from '../../dto/build';
import { Params } from '../../dto/base';
export default interface IBuildService {
  index(params: Params): Promise<BuildResponse[] | []>;
  find(id: number): Promise<BuildResponse | null>;
  store(buildData: BuildCreate): Promise<BuildResponse | null>;
  updateBuild(
    id: string,
    buildData: BuildUpdate,
  ): Promise<BuildResponse | null>;
  // deleteBuild(id: string): Promise<any>;
}
