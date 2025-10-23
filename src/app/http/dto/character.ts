import { JsonArray, JsonObject } from '@prisma/client/runtime/library';

export class CharacterResponse {
  id!: number;
  uuid?: string;
  name!: string;
  lore?: string | null;
  gallery?: string | null | undefined;
}

export class CharacterCreate {
  uuid?: string;
  name!: string;
  lore!: string;
  gallery?: JsonArray | JsonObject | null;
}
