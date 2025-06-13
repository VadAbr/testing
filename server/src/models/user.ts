import { getDB } from '../config';
import { Collection } from 'mongodb';
import { User } from '../types/user';

export const getUserCollection = (): Collection<User> => getDB().collection('users');
