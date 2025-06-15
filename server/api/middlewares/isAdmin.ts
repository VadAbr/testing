import { Request, Response, NextFunction } from 'express';
import { getUserCollection } from '../models';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = getUserCollection();
    const currentUser = await user.findOne({ id: userId });

    if (!currentUser || !currentUser.isAdmin) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    next();
  } catch (err: any) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error' });
  }
};
