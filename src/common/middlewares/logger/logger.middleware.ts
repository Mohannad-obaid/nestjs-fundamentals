import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
//import { UserService } from 'src/module/users/user.service';

@Injectable()
// can use constractor in this class
export class LoggerMiddleware implements NestMiddleware {
  //constructor(private readonly userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    //any logic
    console.log(`LoggerMiddleware: ${req.body} ${req.url}`);
    next();
  }
}

// export const loggerMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log(`Function logger middleware .....`);
//   next();
// };
