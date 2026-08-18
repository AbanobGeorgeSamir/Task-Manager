const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { connectDatabase } = require('./config/database');

const app = express();
const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
const allowedOrigins = (process.env.CLIENT_ORIGIN || `http://localhost:3000,http://127.0.0.1:3000,${vercelOrigin}`)
  .split(',').map((origin) => origin.trim()).filter(Boolean);
const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(cors({
  origin(origin, callback) {
    const localDevelopmentOrigin = process.env.NODE_ENV !== 'production' && localOriginPattern.test(origin || '');
    if (!origin || allowedOrigins.includes(origin) || localDevelopmentOrigin) return callback(null, true);
    return callback(new Error('This origin is not allowed by CORS.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50kb' }));
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// This is cached by Mongoose, so it safely supports Vercel's serverless runtime.
app.use('/api', async (req, res, next) => {
  try { await connectDatabase(); next(); } catch (error) { next(error); }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'taskflow-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, req, res, next) => {
  console.error(error);
  if (error.message === 'This origin is not allowed by CORS.') return res.status(403).json({ message: error.message });
  return res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

module.exports = app;
