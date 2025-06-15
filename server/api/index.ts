import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config';
import authRoutes from './routes/auth';
import emailRoutes from './routes/email';
import payRoutes from './routes/pay';
import testRoutes from './routes/test';

dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/payment', payRoutes);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // connectDB();
});

module.exports = app;
