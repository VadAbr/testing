export type CreateResponse = {
  status: 'success' | 'error'
  result: {
    link: string
    uuid: string
    test_mode: boolean
  }
}

export type CheckResponse = {
  status: 'success' | 'error'
  result: {
    uuid: string
    created: string
    status: 'created' | 'paid'
    invoice_status: 'start' | 'success'
  }[]
}
