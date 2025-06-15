import { getDB } from '../config';
import { Collection } from 'mongodb';
import { Test } from '../types/test.ts';

export const getTestCollection = (): Collection<Test> => getDB().collection('tests');
