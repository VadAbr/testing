import { RequestHandler } from 'express';
import axios from 'axios';
import { CreateResponse, CheckResponse } from './types.ts';
import { getPaymentCollection, getTestCollection } from '../../models';
import { randomUUID } from 'node:crypto';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${process.env.PAYMENT_API_TOKEN}`,
  },
  baseURL: process.env.PAYMENT_URI,
});

const ApiPath = {
  createInvoice: '/invoice/create',
  checkInvoice: '/invoice/merchant/info',
  cancelInvoice: '/invoice/merchant/canceled',
};

export const startPayment: RequestHandler = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const data = await axiosInstance
    .post<CreateResponse>(ApiPath.createInvoice, {
      amount: process.env.TEST_COST,
      shop_id: process.env.SHOP_ID,
      currency: 'USD',
    })
    .then((res) => res.data);

  const payment = getPaymentCollection();
  const id = randomUUID();

  await payment.insertOne({
    id,
    externalId: data.result.uuid,
    userId,
    status: 'pending',
    link: data.result.link,
  });

  res.json({
    id,
    link: data.result.link,
  });
};

export const checkPayment: RequestHandler = async (req, res) => {
  const { invoiceId } = req.body;
  const userId = req.user?.id;

  if (!invoiceId || !userId) {
    res.status(403).json({ message: 'Invalid data' });
    return;
  }

  const payment = getPaymentCollection();
  const test = getTestCollection();
  const currentPayment = await payment.findOne({ id: invoiceId });

  if (!currentPayment) {
    res.status(403).json({ message: 'Invoice is not found' });
    return;
  }

  const data = await axiosInstance
    .post<CheckResponse>(ApiPath.checkInvoice, {
      uuids: [currentPayment.externalId],
    })
    .then((res) => res.data);

  if (currentPayment.status === 'success') {
    res.json({
      status: currentPayment.status,
    });
    return;
  }

  if (data.result[0].invoice_status === 'success') {
    const testId = randomUUID();

    await payment.updateOne({ id: invoiceId }, { $set: { status: 'success' } });
    await test.insertOne({
      id: testId,
      userId,
      status: 'pending',
      createdAt: new Date(),
    });

    res.json({
      status: 'success',
      testId,
    });
    return;
  }

  res.json({
    status: 'pending',
  });
};

export const cancelPayment: RequestHandler = async (req, res) => {
  const { invoiceId } = req.body;

  if (!invoiceId) {
    res.status(403).json({ message: 'Invalid data' });
    return;
  }

  const payment = getPaymentCollection();
  const currentPayment = await payment.findOne({ id: invoiceId });

  if (!currentPayment) {
    res.status(403).json({ message: 'Invoice is not found' });
    return;
  }

  if (currentPayment.status === 'canceled') {
    res.json({
      result: true,
    });
    return;
  }

  const data = await axiosInstance
    .post<unknown>(ApiPath.cancelInvoice, {
      uuid: currentPayment.externalId,
    })
    .then((res) => res.data);

  await payment.updateOne({ id: invoiceId }, { $set: { status: 'canceled' } });

  res.json({
    result: Boolean(data),
  });
};

export const getLastPayment: RequestHandler = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const payment = getPaymentCollection();
  const payments = await payment.find({ userId: userId, status: 'pending' }).limit(1).toArray();

  if (!payments || !payments[0]) {
    res.status(403).json({ message: 'Invoice is not found' });
    return;
  }

  res.json({
    id: payments[0].id,
    link: payments[0].link,
  });
};
