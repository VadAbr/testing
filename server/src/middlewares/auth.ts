import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.header('Authorization');
    if (!header) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const token = header.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const { id, password } = decoded;
    if (typeof id !== 'string' || typeof password !== 'string') {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = { id, password, ...decoded };
    next();
  } catch (err: any) {
    console.error('🛡️ JWT verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
