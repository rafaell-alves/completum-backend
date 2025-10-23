import express, { Request, Response } from 'express';
import AuthController from '../app/http/controllers/AuthController';
const router = express.Router();
router.post('/login', (req: Request, res: Response) => {
  AuthController.login(req, res);
});

export default router;
