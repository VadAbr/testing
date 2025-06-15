import { getDB } from '../config';
import { Collection } from 'mongodb';
import { Payment } from '../types/payment';

export const getPaymentCollection = (): Collection<Payment> => getDB().collection('payments');
