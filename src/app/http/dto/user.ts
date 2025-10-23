export class UserResponse {
  id!: number;
  name!: string | null;
  email: string | undefined;
  password?: string | null;
  password_salt?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export class CreateUserDTO {
  uuid?: string;
  name!: string;
  nickname!: string;
  birthday!: string;
  email!: string;
  password!: string;
  password_salt?: string;
}

export class UpdateUserDTO {
  name!: string;
  email!: string;
  password!: string;
}

export class FavoriteCharacterDto {
  favorite_id!: number[];
}
