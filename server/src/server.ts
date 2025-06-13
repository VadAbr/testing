import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config';
import authRoutes from './routes/auth';
import emailRoutes from './routes/email';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
