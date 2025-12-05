// gateway/src/lib/proxy.ts
import { RequestHandler } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

interface ProxyConfig {
  target: string|undefined;
  pathRewrite?: Record<string, string>;
}

export function createServiceProxy(config: ProxyConfig): RequestHandler {
  const options: Options = {
    target: config.target,
    changeOrigin: true,
    pathRewrite: config.pathRewrite,
    onProxyReq: (proxyReq, req) => {
      // userId 헤더 전달
      if (req.headers['x-user-id']) {
        proxyReq.setHeader('x-user-id', req.headers['x-user-id'] as string);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // 로깅
      console.log(`[Proxy] ${req.method} ${req.url} → ${config.target} (${proxyRes.statusCode})`);
    },
    onError: (err, req, res) => {
      console.error(`[Proxy Error] ${req.url}:`, err);
      res.status(502).json({ error: 'Bad Gateway' });
    },
  };

  return createProxyMiddleware(options);
}