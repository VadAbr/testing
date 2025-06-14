import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { getUserCollection } from '../models';
import { generateToken } from '../utils/jwt';
import { randomUUID } from 'node:crypto';

export const register: RequestHandler = async (req, res) => {
  const { name, age, password, email, workExperience, position, isSatisfied } = req.body;
  const users = getUserCollection();

  const existing = await users.findOne({ email });
  if (existing) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const id = randomUUID();
  await users.insertOne({
    id,
    name,
    age,
    password: hashed,
    email,
    workExperience,
    position,
    isSatisfied,
  });

  const token = generateToken({ id, name, email });
  res.json({ token });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const users = getUserCollection();

  const user = await users.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ id: user.id, name: user.name, email: user.email });
  res.json({ token, isAdmin: user.isAdmin });
};
