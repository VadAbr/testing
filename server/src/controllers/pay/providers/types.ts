export interface PaymentProviderConfig {
  apiKey: string;
  shopId: string;
  baseURL: string;
}

export interface CreatePaymentDTO {
  amount: number;
  currency: string;
  description?: string;
  returnUrl?: string;
}

export interface PaymentResult {
  id: string;
  externalId: string;
  status: 'pending' | 'success' | 'canceled';
  link: string;
}

export interface CheckPaymentResult {
  status: 'pending' | 'success' | 'canceled';
}

export interface PaymentProvider {
  createPayment(data: CreatePaymentDTO): Promise<PaymentResult>;
  checkPayment(externalId: string): Promise<CheckPaymentResult>;
  cancelPayment(externalId: string): Promise<boolean>;
} 