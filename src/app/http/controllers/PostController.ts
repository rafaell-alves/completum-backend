// import { Request, Response } from 'express';
// import { CreatePostSchema } from '../schemas/post.schema';
// import { PostCreate, PostResponse } from '../dto/post';
// import prisma from '../../../config/prisma.client';
// class PostController {
//   //   async index(req: Request, res: Response) {}
//   async store(req: Request, res: Response): Promise<Response> {
//     try {
//       if (!req.body) {
//         return res
//           .status(400)
//           .json({ error: 'No data provided in the request body' });
//       }

//       const validation = CreatePostSchema.safeParse(req.body);

//       if (!validation.success) {
//         return res.status(400).json({
//           error: 'Validation Error',
//           details: validation.error.format(),
//         });
//       }

//       const data: PostCreate = { ...validation.data };

//       data.uuid = crypto.randomUUID();

//       await prisma.post.create({ data });
//       const post_response: PostResponse = { ...result };
//       return res.status(200).json({
//         post_response,
//       });
//     } catch (error) {
//       return res.status(500).json({ error: error });
//     }
//   }
// }

// export default new PostController();
