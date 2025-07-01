export type PaymentMethod = 'crypto' | 'yukassa';

export interface Payment {
  id: string;
  externalId: string;
  userId: string;
  status: 'canceled' | 'success' | 'pending';
  link: string;
  paymentMethod: PaymentMethod;
}

export interface CreatePaymentRequest {
  paymentMethod: PaymentMethod;
  returnUrl: string;
}
