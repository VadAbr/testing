import jwt from 'jsonwebtoken';

type TokenData = {
  id: string;
  password: string;
};

export const generateToken = (payload: TokenData): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};
