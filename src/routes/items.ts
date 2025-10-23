import express, { NextFunction, Request, Response } from 'express'; // Importando Request e Response
import middleware from '../common/middleware/Middleware';
import ItemController from '../app/http/controllers/ItemController';

const router = express.Router();

const token_middleware = (req: Request, res: Response, next: NextFunction) => {
  middleware.auth(req, res, next);
};
router.get('/list-items', token_middleware, (req: Request, res: Response) => {
  ItemController.index(req, res);
});

router.get('/find/:id', (req: Request, res: Response) => {
  ItemController.find(req, res);
});

export default router;
