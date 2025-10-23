import { z } from 'zod';
export const CreateCharacterSchema = z.object({
  name: z.string().min(3, 'Name need more 3 characters'),
  lore: z.string(),
});

export const ParamsCharacterSchema = z.object({
  page: z.number().min(0).optional(),
});

export type ParamsCharacter = z.infer<typeof ParamsCharacterSchema>;
