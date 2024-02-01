import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if(!token){
      return res.status(401).json({ message: 'Token not provided' });
    }
    const tokenWithoutBearer = token.split(' ')[1]; 
    if (token) {
      try {
        const decoded = jwt.decode(tokenWithoutBearer);
        if (!decoded || !decoded['kahaId']) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        req['user'] = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      return res.status(401).json({ message: 'Token not provided' });
    }
  }
}
