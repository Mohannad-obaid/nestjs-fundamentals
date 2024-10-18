/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY, Roles, } from 'src/common/decorators/public.decorator';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  [x: string]: any;
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //Authorization
    const IsPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (IsPublic) {
      return true;
    }

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;


    if (!user) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );

    const accessRoles: boolean = this.authService.matchRoles(
      requiredRoles,
      user.roles,
    );

    if (!accessRoles) {
      throw new ForbiddenException('You do not have access to this resource');
    }


    // Authontication 

    // const jwt =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
 
    const isValedToken = this.jwtService.verifyToken(
      request.headers.authorization,
    );

   
    if (!isValedToken) {
      throw new UnauthorizedException('Please login to get access');
    }
 
    request.user = isValedToken;
   return true;
  }
}
