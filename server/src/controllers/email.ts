import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';

export const sendEmail: RequestHandler = async (req, res) => {
  const { fromEmail } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'vadimabramov322@gmail.com',
      subject: `Новое письмо от пользователя ${req.user?.name ?? ''}`,
      text: `Письмо от: ${fromEmail}`,
    });

    res.json({ message: 'Письмо отправлено', info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка отправки письма' });
  }
};
