export type PaymentMethod = 'crypto' | 'yukassa'

export type CreateResponse = {
  id: string
  // ссылка на оплату
  link: string
  paymentMethod?: PaymentMethod
}

export type CreatePaymentRequest = {
  paymentMethod: PaymentMethod
  returnUrl: string
}

export type CheckResponse = {
  testId?: string
  status: 'success' | 'pending' | 'canceled'
}

export type CancelResponse = {
  result: boolean
}
