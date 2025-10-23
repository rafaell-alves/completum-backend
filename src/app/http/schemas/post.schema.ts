import { z } from 'zod';

export const CreatePostSchema = z.object({
  topic: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  user_id: z.number().int().positive('Author ID must be a positive integer'),
  gallery: z.any().optional(),
});

export type CreatePostDTO = z.infer<typeof CreatePostSchema>;
