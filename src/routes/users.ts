import express, { NextFunction, Request, Response } from 'express'; // Importando Request e Response
import UserController from '../app/http/controllers/UserController';
import middleware from '../common/middleware/Middleware';
const router = express.Router();

const token_middleware = (req: Request, res: Response, next: NextFunction) => {
  middleware.auth(req, res, next);
};
router.post('/create-user', (req: Request, res: Response) => {
  UserController.store(req, res);
});

router.post(
  '/character-favorite/:id',
  token_middleware,
  (req: Request, res: Response) => {
    UserController.add_character_favorites(req, res);
  },
);
router.get('/find/:id', token_middleware, (req: Request, res: Response) => {
  UserController.find(req, res);
});

export default router;
