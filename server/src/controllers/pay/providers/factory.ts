import { PaymentProvider, PaymentProviderConfig } from './types';
import { CryptoCloudProvider } from './cryptocloud';
import { YooKassaProvider } from './yookassa';
import { PaymentMethod } from '../../../types/payment';

const PROVIDER_CONFIG: Record<PaymentMethod, PaymentProviderConfig> = {
  crypto: {
    apiKey: process.env.CRYPTO_API_TOKEN || '',
    shopId: process.env.CRYPTO_SHOP_ID || '',
    baseURL: process.env.CRYPTO_PAYMENT_URI || '',
  },
  yukassa: {
    apiKey: process.env.YOOKASSA_API_TOKEN || '',
    shopId: process.env.YOOKASSA_SHOP_ID || '',
    baseURL: process.env.YOOKASSA_PAYMENT_URI || '',
  },
};

export class PaymentProviderFactory {
  private static providers: Record<
    PaymentMethod,
    new (config: PaymentProviderConfig) => PaymentProvider
  > = {
    crypto: CryptoCloudProvider,
    yukassa: YooKassaProvider,
  };

  static createProvider(method: PaymentMethod): PaymentProvider {
    const Provider = this.providers[method];
    if (!Provider) {
      throw new Error(`Payment provider ${method} not found`);
    }
    return new Provider(PROVIDER_CONFIG[method]);
  }
}
