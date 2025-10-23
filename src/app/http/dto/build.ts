import { Item } from '@prisma/client';

export class BuildResponse {
  id?: number;
  uuid?: string;
  name?: string;
  character_id?: number;
  user_id?: number;
  items?: Item[];
  description?: string | null;
}
export class BuildCreate {
  uuid?: string;
  name!: string;
  character_id!: number;
  user_id!: number;
  items!: number[];
  description?: string | null;
}

export class BuildUpdate {
  name?: string;
  description?: string | null;
  gallery?: string | null | undefined;
}
