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

  const token = generateToken({ id, password: hashed });
  res.json({
    token,
    isAdmin: false,
    userInfo: { name: name, id: id, email: email },
  });
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

  const token = generateToken({ id: user.id, password: user.password });
  res.json({
    token,
    isAdmin: user.isAdmin,
    userInfo: { name: user.name, id: user.id, email: user.email },
  });
};

export const tryAuth: RequestHandler = async (req, res) => {
  const id = req.user?.id;
  const password = req.user?.password;

  const users = getUserCollection();
  const user = await users.findOne({ id });

  if (!user || !password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ id: user.id, password: user.password });
  res.json({
    token,
    isAdmin: user.isAdmin,
    userInfo: { name: user.name, id: user.id, email: user.email },
  });
};
