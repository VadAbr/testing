export type CreateResponse = {
  id: string
  // ссылка на оплату
  link: string
}

export type CheckResponse = {
  testId?: string
  status: 'success' | 'pending'
}
