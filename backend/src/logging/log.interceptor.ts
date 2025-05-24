import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LogGateway } from './log.gateway';
import { Observable, tap, timestamp } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logGateway: LogGateway) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const now = Date.now();
    const user = (req as any).user || { role: 'anonymous' };
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const url = req.originalUrl || req.url;
    const method = req.method;

    return next.handle().pipe(
      tap({
        next: () => {
          const status = ctx.getResponse().statusCode;
          this.logGateway.handleLog({
            timestamp: new Date().toISOString(),
            method,
            url,
            ip,
            role: user.role,
            status,
            duration: `${Date.now() - now} ms`,
          });
        },
        error: (err) => {
          this.logGateway.handleLog({
            timestamp: new Date().toISOString(),
            method,
            url,
            ip,
            role: user.role,
            error: err.message,
            duration: `${Date.now() - now} ms`,
          });
        },
      }),
    );
  }
}
