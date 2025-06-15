export interface Payment {
  id: string;
  externalId: string;
  userId: string;
  status: 'canceled' | 'success' | 'pending';
  link: string;
}
