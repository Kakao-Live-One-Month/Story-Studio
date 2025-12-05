"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { createProxyMiddleware } from 'http-proxy-middleware';
const cors_1 = __importDefault(require("cors"));
// import { authMiddleware } from '../src/middleware/auth';
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
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
exports.default = app;
