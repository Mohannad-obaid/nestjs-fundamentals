import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const csr = context.switchToHttp();
    const request = csr.getRequest<Request>();
    request.body = { ...request.body, test: 'test' };
    return next.handle().pipe(
      // timeout
      timeout(2000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return error;
      }),
    );
  }
}
