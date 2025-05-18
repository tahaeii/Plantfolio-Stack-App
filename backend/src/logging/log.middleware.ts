import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogGateway } from './log.gateway';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly logGateway: LogGateway) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const now = Date.now();
    const user = (req as any).user || { role: 'anonymous' };
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let resBody: any;
    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      resBody = body;
      return originalSend(body);
    };

    res.on('finish', () => {
      const status = res.statusCode;
      let err: string | null = null;

      if (status >= 400) {
        try {
          const parsed =
            typeof resBody === 'string' ? JSON.parse(resBody) : resBody;
          err = parsed?.message || parsed?.error || JSON.stringify(parsed);
        } catch {
          err = typeof resBody === 'string' ? resBody : 'Unknown error';
        }
      }

      this.logGateway.emitLog({
        timestamp: new Date().toISOString(),
        method,
        url: originalUrl,
        ip,
        role: user.role,
        status,
        duration: `${Date.now() - now}`,
        ...(err && { err }),
      });
    });
    next();
  }
}
