import axios from 'axios';
import { randomUUID } from 'node:crypto';
import {
  PaymentProvider,
  PaymentProviderConfig,
  CreatePaymentDTO,
  PaymentResult,
  CheckPaymentResult,
} from './types';

interface YooKassaCreateResponse {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  paid: boolean;
  confirmation: {
    type: string;
    confirmation_url: string;
  };
}

interface YooKassaCheckResponse {
  status: 'pending' | 'succeeded' | 'canceled';
  paid: boolean;
}

export class YooKassaProvider implements PaymentProvider {
  private axiosInstance;

  constructor(config: PaymentProviderConfig) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': randomUUID(),
      },
      auth: {
        username: config.shopId,
        password: config.apiKey,
      },
      baseURL: config.baseURL,
    });
  }

  async createPayment(data: CreatePaymentDTO): Promise<PaymentResult> {
    const response = await this.axiosInstance
      .post<YooKassaCreateResponse>('/payments', {
        amount: {
          value: '4500.00',
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: data.returnUrl,
        },
        description: data.description,
        capture: true,
      })
      .then((res) => res.data);

    return {
      id: randomUUID(),
      externalId: response.id,
      status: this.mapYooKassaStatus(response.status),
      link: response.confirmation.confirmation_url,
    };
  }

  async checkPayment(externalId: string): Promise<CheckPaymentResult> {
    const response = await this.axiosInstance
      .get<YooKassaCheckResponse>(`/payments/${externalId}`)
      .then((res) => res.data);

    return {
      status: this.mapYooKassaStatus(response.status),
    };
  }

  async cancelPayment(externalId: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }

  private mapYooKassaStatus(status: string): 'pending' | 'success' | 'canceled' {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'canceled':
        return 'canceled';
      default:
        return 'pending';
    }
  }
}
