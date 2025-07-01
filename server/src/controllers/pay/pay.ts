import { RequestHandler } from 'express';
import { getPaymentCollection, getTestCollection } from '../../models';
import { PaymentProviderFactory } from './providers/factory';
import { PaymentProvider } from './providers/types';
import { randomUUID } from 'node:crypto';
import { CreatePaymentRequest, PaymentMethod } from '../../types/payment';
import { logger } from '../../utils/logger';
import { PaymentError } from '../../middlewares/errorHandler';

const getPaymentProvider = (method: PaymentMethod): PaymentProvider => {
  return PaymentProviderFactory.createProvider(method);
};

export const startPayment: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { paymentMethod, returnUrl } = req.body as CreatePaymentRequest;

    if (!userId) {
      throw new PaymentError('Invalid credentials', 401);
    }

    if (!paymentMethod) {
      throw new PaymentError('Payment method is required', 400);
    }

    logger.info('Starting payment process', { userId, paymentMethod });

    if (!returnUrl) {
      throw new PaymentError('Return URL is required', 400);
    }

    const provider = getPaymentProvider(paymentMethod);
    const result = await provider.createPayment({
      amount: Number(process.env.TEST_COST),
      currency: 'USD',
      returnUrl,
    });

    const payment = getPaymentCollection();

    await payment.insertOne({
      id: result.id,
      externalId: result.externalId,
      userId,
      status: result.status,
      link: result.link,
      paymentMethod,
    });

    logger.info('Payment created successfully', { paymentId: result.id });

    res.json({
      id: result.id,
      link: result.link,
    });
  } catch (error) {
    next(error);
  }
};

export const checkPayment: RequestHandler = async (req, res, next) => {
  try {
    const { invoiceId } = req.body;
    const userId = req.user?.id;

    if (!invoiceId || !userId) {
      throw new PaymentError('Invalid data', 403);
    }

    const payment = getPaymentCollection();
    const test = getTestCollection();
    const currentPayment = await payment.findOne({ id: invoiceId });

    if (!currentPayment) {
      throw new PaymentError('Invoice is not found', 403);
    }

    logger.debug('Checking payment status', { invoiceId, userId });

    if (currentPayment.status === 'success') {
      res.json({
        status: currentPayment.status,
      });
      return;
    }

    const provider = getPaymentProvider(currentPayment.paymentMethod);
    const result = await provider.checkPayment(currentPayment.externalId);

    if (result.status === 'success') {
      await payment.updateOne({ id: invoiceId }, { $set: { status: 'success' } });
      
      const testId = await test.insertOne({
        id: randomUUID(),
        userId,
        status: 'pending',
        createdAt: new Date(),
      }).then(result => result.insertedId.toString());

      logger.info('Payment completed successfully', { invoiceId, testId });

      res.json({
        status: 'success',
        testId,
      });
      return;
    }

    res.json({
      status: result.status,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelPayment: RequestHandler = async (req, res, next) => {
  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      throw new PaymentError('Invalid data', 403);
    }

    const payment = getPaymentCollection();
    const currentPayment = await payment.findOne({ id: invoiceId });

    if (!currentPayment) {
      throw new PaymentError('Invoice is not found', 403);
    }

    logger.debug('Canceling payment', { invoiceId });

    if (currentPayment.status === 'canceled') {
      res.json({
        result: true,
      });
      return;
    }

    const provider = getPaymentProvider(currentPayment.paymentMethod);
    const result = await provider.cancelPayment(currentPayment.externalId);

    if (result) {
      await payment.updateOne({ id: invoiceId }, { $set: { status: 'canceled' } });
      logger.info('Payment canceled successfully', { invoiceId });
    } else {
      logger.warn('Failed to cancel payment', { invoiceId });
    }

    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getLastPayment: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new PaymentError('Invalid credentials', 401);
    }

    const payment = getPaymentCollection();
    const payments = await payment.find({ userId: userId, status: 'pending' }).limit(1).toArray();

    if (!payments || !payments[0]) {
      throw new PaymentError('Invoice is not found', 403);
    }

    logger.debug('Retrieved last payment', { userId, paymentId: payments[0].id });

    res.json({
      id: payments[0].id,
      link: payments[0].link,
      paymentMethod: payments[0].paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};
