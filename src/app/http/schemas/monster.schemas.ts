import { z } from 'zod';
export const CreateMonsterSchema = z.object({
  name: z.string().min(3, 'Name need more 3 characters'),
  description: z.string(),
  weakness: z.any().optional(),
  ailments: z.any().optional(),
  resistances: z.any().optional(),
  elements: z.any().optional(),
  gallery: z.any().optional(),
});

export const ParamsMonsterSchema = z.object({
  page: z.number().min(0).optional(),
});
