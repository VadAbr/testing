import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from '../src/config';
import authRoutes from '../src/routes/auth';
import emailRoutes from '../src/routes/email';
import payRoutes from '../src/routes/pay';
import testRoutes from '../src/routes/test';
import { errorHandler } from '../src/middlewares/errorHandler';
import { logger } from '../src/utils/logger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body,
    headers: {
      'user-agent': req.get('user-agent'),
      'content-type': req.get('content-type'),
    },
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/payment', payRoutes);
app.use('/api/test', testRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to database', error);
    process.exit(1);
  });

export default app;
