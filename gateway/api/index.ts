import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
// import { authMiddleware } from '../src/middleware/auth';

const app = express();

app.use(cors({
  origin: 'https://story-studio-frontend.vercel.app',
  credentials: true,
}));

// // Story Service
// app.use('/api/story', authMiddleware, createProxyMiddleware({
//   target: 'https://story-service.vercel.app',
//   changeOrigin: true,
//   pathRewrite: { '^/api/story': '' },
// }));

// // Payment Service
// app.use('/api/payment', authMiddleware, createProxyMiddleware({
//   target: 'https://payment-service.vercel.app',
//   changeOrigin: true,
//   pathRewrite: { '^/api/payment': '' },
// }));

// // PDF Service
// app.use('/api/pdf', authMiddleware, createProxyMiddleware({
//   target: 'https://pdf-service.vercel.app',
//   changeOrigin: true,
//   pathRewrite: { '^/api/pdf': '' },
// }));

// // Upload Service
// app.use('/api/upload', authMiddleware, createProxyMiddleware({
//   target: 'https://upload-service.vercel.app',
//   changeOrigin: true,
//   pathRewrite: { '^/api/upload': '' },
// }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway' });
});

export default app;
