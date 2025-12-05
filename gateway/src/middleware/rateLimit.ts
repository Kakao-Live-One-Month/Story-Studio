// gateway/src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 요청 제한
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// 서비스별 제한
export const storyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10, // AI 생성 제한
  message: 'Too many story generation requests.',
});

export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, // 결제 시도 제한
  message: 'Too many payment requests.',
});