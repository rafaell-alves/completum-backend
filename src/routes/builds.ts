import express, { NextFunction, Request, Response } from 'express'; // Importando Request e Response
import middleware from '../common/middleware/Middleware';
import BuildController from '../app/http/controllers/BuildController';

const router = express.Router();

const token_middleware = (req: Request, res: Response, next: NextFunction) => {
  middleware.auth(req, res, next);
};

router.post('/create', token_middleware, (req: Request, res: Response) => {
  BuildController.store(req, res);
});

router.get(
  '/list-builds-all',
  token_middleware,
  (req: Request, res: Response) => {
    BuildController.index(req, res);
  },
);

router.get('/find/:id', token_middleware, (req: Request, res: Response) => {
  BuildController.find(req, res);
});

export default router;
