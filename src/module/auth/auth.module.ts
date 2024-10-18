import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from 'src/common/guards/jwt/jwt.service';
import { AuthController } from './auth.controller';
import { UserService } from '../users/user.service';

@Module({
  controllers: [AuthController],
  providers: [JwtService, AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
