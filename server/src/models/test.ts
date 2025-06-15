import { getDB } from '../config';
import { Collection } from 'mongodb';
import { Test } from '../types/test';

export const getTestCollection = (): Collection<Test> => getDB().collection('tests');
