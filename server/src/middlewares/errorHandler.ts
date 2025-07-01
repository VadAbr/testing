import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

export class PaymentError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err instanceof PaymentError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  const context = {
    path: req.path,
    method: req.method,
    query: req.query,
    body: req.body,
    userId: req.user?.id,
    ...(err instanceof PaymentError ? err.context : {}),
  };

  logger.error(`Request failed: ${message}`, err, context);

  res.status(statusCode).json({
    status: 'error',
    message,
  });
}; 