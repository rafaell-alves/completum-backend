import { JsonValue } from '@prisma/client/runtime/library';
export class MonsterResponse {
  id!: number;
  uuid?: string;
  name!: string;
  description?: string | null;
  weakness?: JsonValue;
  ailments?: JsonValue;
  resistances?: JsonValue;
  elements?: JsonValue;
  gallery?: JsonValue;
}

export class MonsterCreate {
  uuid?: string;
  name!: string;
  description?: string | null;
  weakness?: string[];
  ailments?: string[];
  resistances?: string[];
  elements?: string[];
  gallery?: string[];
}

export class MonsterUpdate {
  name!: string;
  description?: string | null;
  weakness?: string[];
  ailments?: string[];
  resistances?: string[];
  elements?: string[];
  gallery?: string[];
}
