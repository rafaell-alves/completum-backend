export class ItemResponse {
  id!: number;
  uuid?: string;
  name!: string;
  description?: string | null;
  photo?: string | null;
}

export class ItemCreate {
  uuid?: string;
  name!: string;
  description!: string;
  photo?: string | null;
}
