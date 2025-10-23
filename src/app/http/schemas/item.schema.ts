import { z } from 'zod';
export const CreateItemSchema = z.object({
  name: z.string().min(3, 'Name need more 3 characters'),
  description: z.string(),
});
