// import { ClassSerializerInterceptor, Module } from '@nestjs/common';
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { AuthGuard } from './guards/auth/auth.guard';
// import { RolesGuard } from './guards/auth/roles.guard';
// import { JwtModule } from 'src/common/guards/jwt/jwt.module';
// import { AuthController } from '../auth/auth.controller';
// import { AuthModule } from 'src/auth/auth.module';

// @Module({
//   providers: [
//     { provide: APP_GUARD, useClass: AuthGuard },
//     { provide: APP_GUARD, useClass: RolesGuard },
//     { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
//   ],
//   imports: [JwtModule, AuthModule],
//   controllers: [AuthController],
//   exports: [JwtModule],
// })
// export class CommonModule {}

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { RolesGuard } from './guards/auth/roles.guard';
import { JwtModule } from 'src/common/guards/jwt/jwt.module';
import { AuthController } from '../module/auth/auth.controller';
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    //  { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
  exports: [JwtModule],
})
export class CommonModule {}
