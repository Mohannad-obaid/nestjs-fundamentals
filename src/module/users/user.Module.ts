import { Module } from '@nestjs/common';
import { UsersController } from './user.Controller';
import { UserService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
