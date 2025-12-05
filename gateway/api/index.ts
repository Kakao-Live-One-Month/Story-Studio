import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import { authMiddleware } from '../src/middleware/auth';

const app = express();

const allowedOrigins = [
    'https://story-studio-ashen.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
  ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Story Service
app.use('/api/story', authMiddleware, createProxyMiddleware({
  target: 'https://story-service.vercel.app',
  changeOrigin: true,
  pathRewrite: { '^/api/story': '' },
}));

// Payment Service
app.use('/api/payment', authMiddleware, createProxyMiddleware({
  target: 'https://payment-service-fawn.vercel.app',
  changeOrigin: true,
  pathRewrite: { '^/api/payment': '' },
}));

// PDF Service
app.use('/api/pdf', authMiddleware, createProxyMiddleware({
  target: 'https://pdf-service-pied.vercel.app',
  changeOrigin: true,
  pathRewrite: { '^/api/pdf': '' },
}));

// Upload Service
app.use('/api/upload', authMiddleware, createProxyMiddleware({
  target: 'https://upload-service-psi.vercel.app',
  changeOrigin: true,
  pathRewrite: { '^/api/upload': '' },
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway' });
});

export default app;
