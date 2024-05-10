import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const payload = request.method === 'GET' ? request.query : request.body;
    const log = `${request.url} ${JSON.stringify(payload)}`;
    return next.handle().pipe(tap(() => Logger.log(log)));
  }
}
