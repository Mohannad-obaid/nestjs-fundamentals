import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/users/user.Module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './module/users/user.Controller';

@Module({
  imports: [UserModule, CommonModule, AuthModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //  '*' for all routes
    // consumer.apply(LoggerMiddleware).forRoutes('*');

    // coustem route
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users/:id', method: RequestMethod.PATCH })
      .forRoutes(UsersController);
  }
}
