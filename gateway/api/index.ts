import express from 'express';
import { createServiceProxy } from '../src/lib/proxy';
import corsMiddleware from '../src/middleware/cors';
import { authMiddleware } from '../src/middleware/auth';
import { rateLimiter, storyLimiter, paymentLimiter } from '../src/middleware/rateLimit';

const app = express();

app.use(corsMiddleware);
app.use(rateLimiter);

// Story Service..
app.use('/api/story', authMiddleware, storyLimiter, createServiceProxy({
    target: process.env.STORY_SERVICE_URL,
    pathRewrite: { '^/api/story': '' },
  }));
  
  // Payment Service
  app.use('/api/payment', authMiddleware, paymentLimiter, createServiceProxy({
    target: process.env.PAYMENT_SERVICE_URL,
    pathRewrite: { '^/api/payment': '' },
  }));
  
  // PDF Service
  app.use('/api/pdf', authMiddleware, createServiceProxy({
    target: process.env.PDF_SERVICE_URL,
    pathRewrite: { '^/api/pdf': '' },
  }));
  
  // Upload Service
  app.use('/api/upload', authMiddleware, createServiceProxy({
    target: process.env.UPLOAD_SERVICE_URL,
    pathRewrite: { '^/api/upload': '' },
  }));
  


  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'gateway' });
  });

  app.use('/api/story/health',  storyLimiter, createServiceProxy({
    target: process.env.STORY_SERVICE_URL,
    pathRewrite: { '^/api/story/health': '' },
  }));
  
  app.use('/api/payment/health', paymentLimiter, createServiceProxy({
    target: process.env.PAYMENT_SERVICE_URL,
    pathRewrite: { '^/api/payment/health': '' },
  }));
  
  app.use('/api/pdf/health', createServiceProxy({
    target: process.env.PDF_SERVICE_URL,
    pathRewrite: { '^/api/pdf.health': '' },
  }));
  
  app.use('/api/upload/health', createServiceProxy({
    target: process.env.UPLOAD_SERVICE_URL,
    pathRewrite: { '^/api/upload.health': '' },
  }));
  



export default app;
