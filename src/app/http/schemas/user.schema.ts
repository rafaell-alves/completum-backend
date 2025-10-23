import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  nickname: z
    .string()
    .min(3, 'O nome de usuario deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(5, 'Senha deve ter no minimo 5 digitos'),
  birthday: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  nickname: z
    .string()
    .min(3, 'O nome de usuario deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(5, 'Senha deve ter no minimo 5 digitos'),
});

export const LoginSchema = z.object({
  email: z.string().email('E-mail invalido'),
  password: z.string().min(5, 'Senha deve ter no minimo 5 digitos'),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
