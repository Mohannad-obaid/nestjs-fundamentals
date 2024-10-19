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
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import ormConfig from 'config/orm.config';
// import ormConfigProd from 'config/orm.config.prod';

@Module({
  imports: [
    UserModule,
    CommonModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.staging.env',
      isGlobal: true,
      expandVariables: true,
      // load: [ormConfig, ormConfigProd],
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory:
    //     process.env.NODE_ENV === 'development' ? ormConfig : ormConfigProd,
    // }),
  ],
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
