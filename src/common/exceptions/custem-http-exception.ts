import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor() {
    super('Custom Http Exception', HttpStatus.AMBIGUOUS);
  }
}
