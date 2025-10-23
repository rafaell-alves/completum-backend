import { JsonValue } from '@prisma/client/runtime/library';
export class PostResponse {
  id!: number;
  uuid?: string;
  topic!: string;
  content!: string;
  user_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PostCreate {
  uuid?: string;
  topic!: string;
  content!: string;
  user_id!: number;
  gallery?: JsonValue;
}
