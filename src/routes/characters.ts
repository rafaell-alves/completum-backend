import express, { NextFunction, Request, Response } from 'express'; // Importando Request e Response
import middleware from '../common/middleware/Middleware';
import CharacterController from '../app/http/controllers/CharacterController';
import multer from 'multer';
import Storage from '../utils/RouteStorage';
const route_storage = new Storage('characters');

const upload = multer({ storage: route_storage.get_storage_route() });

const router = express.Router();

const token_middleware = (req: Request, res: Response, next: NextFunction) => {
  middleware.auth(req, res, next);
};
router.post(
  '/create',
  token_middleware,
  upload.array('photo', 5),
  (req: Request, res: Response) => {
    req.body.gallery = route_storage.get_files(req);

    CharacterController.store(req, res);
  },
);

router.get(
  '/list-character',
  token_middleware,
  (req: Request, res: Response) => {
    CharacterController.index(req, res);
  },
);

router.get('/find/:id', (req: Request, res: Response) => {
  CharacterController.find(req, res);
});

router.post('/update/:id', token_middleware, (req: Request, res: Response) => {
  CharacterController.update(req, res);
});

router.delete(
  '/delete/:id',
  token_middleware,
  (req: Request, res: Response) => {
    CharacterController.delete(req, res);
  },
);

export default router;
