import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class WraprDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // //logic before the request is handled
    // console.log(
    //   'Before the request is handled in the interceptor....',
    //   // context,
    // );
    return next
      .handle()
      .pipe
      // map((data) => {
      //   //logic after the request is handled
      //   // console.log(
      //   //   'After the request is handled in the interceptor....',
      //   //   data,
      //   // );
      //   return { response: data };
      // }),
      ();
  }
}
