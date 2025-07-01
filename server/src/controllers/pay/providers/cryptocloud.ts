import axios from 'axios';
import { randomUUID } from 'node:crypto';
import {
  PaymentProvider,
  PaymentProviderConfig,
  CreatePaymentDTO,
  PaymentResult,
  CheckPaymentResult,
} from './types';
import { CreateResponse, CheckResponse } from '../types';

export class CryptoCloudProvider implements PaymentProvider {
  private axiosInstance;
  private config;

  constructor(config: PaymentProviderConfig) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${config.apiKey}`,
      },
      baseURL: config.baseURL,
    });
    this.config = config;
  }

  async createPayment(data: CreatePaymentDTO): Promise<PaymentResult> {
    const response = await this.axiosInstance
      .post<CreateResponse>('/invoice/create', {
        amount: data.amount,
        shop_id: this.config.shopId,
        currency: data.currency,
      })
      .then((res) => res.data);

    return {
      id: randomUUID(),
      externalId: response.result.uuid,
      status: 'pending',
      link: response.result.link,
    };
  }

  async checkPayment(externalId: string): Promise<CheckPaymentResult> {
    const response = await this.axiosInstance
      .post<CheckResponse>('/invoice/merchant/info', {
        uuids: [externalId],
      })
      .then((res) => res.data);

    return {
      status: response.result[0].invoice_status === 'success' ? 'success' : 'pending',
    };
  }

  async cancelPayment(externalId: string): Promise<boolean> {
    const response = await this.axiosInstance
      .post('/invoice/merchant/canceled', {
        uuid: externalId,
      })
      .then((res) => res.data);

    return Boolean(response);
  }
}
