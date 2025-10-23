import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

class Middleware {
  auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const private__key = 'secret';
    if (!token) return res.status(403).end();
    jsonwebtoken.verify(token, private__key, err => {
      if (err) {
        res.status(403).end();
        return;
      }
      next();
    });
  }
}

export default new Middleware();
