import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { getUserCollection } from '../models';
import { generateToken } from '../utils/jwt';

export const register: RequestHandler = async (req, res) => {
  const { name, password } = req.body;
  const users = getUserCollection();

  const existing = await users.findOne({ name });
  if (existing) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ name, password: hashed });

  const token = generateToken({ name });
  res.json({ token });
};

export const login: RequestHandler = async (req, res) => {
  const { name, password } = req.body;
  const users = getUserCollection();

  const user = await users.findOne({ name });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ name });
  res.json({ token });
};
